import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  ImagePlus,
  Leaf,
  Loader2,
  Upload,
  X,
} from "lucide-react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { predictPlantDisease } from "../services/api";

export default function PlantDisease() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function setSelectedImage(file) {
    if (!file) {
      return;
    }

    setError("");
    setPrediction(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedImage(file);
    }

    event.target.value = "";
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      setSelectedImage(file);
    }
  }

  function handlePaste(event) {
    const items = event.clipboardData?.items;

    if (!items) {
      return;
    }

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();

        if (file) {
          setSelectedImage(file);
        }

        return;
      }
    }
  }

  useEffect(() => {
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  });

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function clearImage() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(null);
    setPreviewUrl("");
    setPrediction(null);
    setError("");
  }

  async function handlePredict() {
    if (!imageFile) {
      setError("Please select a plant image first.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const result = await predictPlantDisease(imageFile);

      setPrediction(result);
    } catch (err) {
      console.error("Plant disease prediction error:", err);

      setError(
        err.message || "Unable to predict the plant disease. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function formatPrediction(result) {
    if (typeof result === "string") {
      return result;
    }

    if (result === null || result === undefined) {
      return "No prediction returned.";
    }

    if (typeof result === "object") {
      return JSON.stringify(result, null, 2);
    }

    return String(result);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Plant Disease Detection
        </h2>

        <p className="mt-1 max-w-2xl text-stone-500">
          Upload a photo of a plant or leaf to detect possible diseases using
          SmartAgriAI.
        </p>
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-semibold">Image upload error</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <Leaf className="h-5 w-5 text-forest-700" />
            </div>

            <div>
              <h3 className="font-semibold text-stone-900">
                Upload Plant Image
              </h3>

              <p className="text-sm text-stone-500">
                Choose, drag, drop or paste a clear plant image.
              </p>
            </div>
          </div>

          <div className="mt-6">
            {previewUrl ? (
              <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
                <img
                  src={previewUrl}
                  alt="Selected plant"
                  className="max-h-[420px] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={clearImage}
                  disabled={loading}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-600 shadow-sm ring-1 ring-stone-200 transition hover:bg-white hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
                  dragActive
                    ? "border-forest-500 bg-mist"
                    : "border-stone-200 bg-stone-50 hover:border-forest-400 hover:bg-mist"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="sr-only"
                />

                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-forest-700 shadow-sm ring-1 ring-stone-200">
                  {dragActive ? (
                    <Upload className="h-7 w-7" />
                  ) : (
                    <ImagePlus className="h-7 w-7" />
                  )}
                </span>

                <p className="text-sm font-semibold text-stone-800">
                  {dragActive
                    ? "Drop your image here"
                    : "Choose or drop a plant image"}
                </p>

                <p className="mt-2 text-xs text-stone-500">
                  JPG, JPEG, PNG or other supported image formats
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <Button type="button" onClick={openFilePicker}>
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setError(
                        "Copy an image and press Ctrl+V anywhere on this page.",
                      );
                    }}
                  >
                    <Clipboard className="mr-2 h-4 w-4" />
                    Paste Image
                  </Button>
                </div>

                <p className="mt-4 text-xs text-stone-400">
                  On mobile, Choose Image may also open your camera.
                </p>
              </div>
            )}
          </div>

          {imageFile ? (
            <div className="mt-4 rounded-xl bg-stone-50 px-4 py-3">
              <p className="truncate text-sm font-medium text-stone-800">
                {imageFile.name || "Pasted image"}
              </p>

              <p className="mt-1 text-xs text-stone-500">
                {(imageFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : null}

          {imageFile ? (
            <div className="mt-5 flex gap-3">
              <Button
                type="button"
                onClick={handlePredict}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Detect Disease"
                )}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={clearImage}
                disabled={loading}
              >
                Change / Remove
              </Button>
            </div>
          ) : null}
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3">
              <CheckCircle2 className="h-5 w-5 text-forest-700" />
            </div>

            <div>
              <h3 className="font-semibold text-stone-900">Detection Result</h3>

              <p className="text-sm text-stone-500">
                Your plant disease prediction will appear here.
              </p>
            </div>
          </div>

          {!prediction && !loading ? (
            <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl bg-stone-50 px-6 text-center">
              <div>
                <Leaf className="mx-auto h-10 w-10 text-stone-300" />

                <p className="mt-3 text-sm font-medium text-stone-600">
                  No prediction yet
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  Upload an image and click Detect Disease.
                </p>
              </div>
            </div>
          ) : loading ? (
            <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-stone-50 text-center">
              <Loader2 className="h-9 w-9 animate-spin text-forest-700" />

              <p className="mt-4 text-sm font-semibold text-stone-700">
                Analyzing your image...
              </p>

              <p className="mt-1 text-xs text-stone-400">
                Waiting for the AI service to respond.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Prediction
                </p>

                <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-stone-800">
                  {formatPrediction(prediction)}
                </pre>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" />

          <div>
            <h3 className="text-sm font-semibold text-stone-800">
              Upload options
            </h3>

            <ul className="mt-2 space-y-1 text-sm text-stone-500">
              <li>• Choose an image from your device.</li>
              <li>• Drag and drop an image from File Explorer.</li>
              <li>• Copy an image and press Ctrl+V to paste it.</li>
              <li>• On supported mobile devices, use the camera.</li>
              <li>
                • Preview, change or remove the selected image before detection.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

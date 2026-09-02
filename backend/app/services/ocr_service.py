import os

# Limit native libraries from creating too many threads on macOS
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")

from paddleocr import PaddleOCR


class OCRService:

    def __init__(self):
        self.ocr = None

    def _get_ocr(self):
        if self.ocr is None:
            print("Initializing PaddleOCR...")

            self.ocr = PaddleOCR(
                lang="en",
                device="cpu"
            )

            print("PaddleOCR initialized successfully.")

        return self.ocr

    def extract_text(self, image_path: str):

        ocr = self._get_ocr()

        result = ocr.predict(image_path)

        extracted_text = []

        for page in result:

            if hasattr(page, "json"):
                data = page.json

                # Handle JSON string if returned
                if isinstance(data, str):
                    import json
                    data = json.loads(data)

                if isinstance(data, dict):
                    data = data.get("res", data)

                texts = data.get("rec_texts", [])

                for text in texts:
                    if text:
                        extracted_text.append(str(text))

        return extracted_text
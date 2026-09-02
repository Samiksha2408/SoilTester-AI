import cv2
import os


def preprocess_image(input_path: str, output_path: str):
    """
    Preprocess soil report image before OCR.
    """

    image = cv2.imread(input_path)

    if image is None:
        raise ValueError("Unable to read image")

    # 1. Resize
    height, width = image.shape[:2]

    if width < 1500:
        scale = 1500 / width
        new_width = int(width * scale)
        new_height = int(height * scale)

        image = cv2.resize(
            image,
            (new_width, new_height),
            interpolation=cv2.INTER_CUBIC
        )

    # 2. Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 3. Remove noise
    denoised = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    # 4. Threshold
    processed = cv2.adaptiveThreshold(
        denoised,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

# 5. Create output directory
    output_dir = os.path.dirname(output_path)

    if output_dir:
        os.makedirs(
            output_dir,
            exist_ok=True
        )

    # 6. Save processed image
    success = cv2.imwrite(
        output_path,
        processed
    )

    if not success:
        raise ValueError(
            f"Unable to save processed image: {output_path}"
        )

    return output_path
    
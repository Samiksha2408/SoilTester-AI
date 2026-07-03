import os
from pathlib import Path

from PIL import Image
from fastapi import HTTPException, UploadFile, status


class ImageProcessing:
    """
    Utility class for image processing.
    """

    ALLOWED_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
    }

    @staticmethod
    def validate_image(file: UploadFile) -> bool:
        """
        Validate uploaded image type.
        """

        extension = Path(file.filename).suffix.lower()

        if extension not in ImageProcessing.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only JPG, JPEG and PNG images are allowed.",
            )

        return True

    @staticmethod
    def resize_image(
        image_path: str,
        width: int = 224,
        height: int = 224,
    ) -> str:
        """
        Resize image.
        """

        image = Image.open(image_path)

        image = image.resize(
            (width, height)
        )

        image.save(image_path)

        return image_path

    @staticmethod
    def convert_to_rgb(
        image_path: str,
    ) -> str:
        """
        Convert image to RGB.
        """

        image = Image.open(image_path)

        rgb_image = image.convert("RGB")

        rgb_image.save(image_path)

        return image_path

    @staticmethod
    def compress_image(
        image_path: str,
        quality: int = 80,
    ) -> str:
        """
        Compress image.
        """

        image = Image.open(image_path)

        image.save(
            image_path,
            optimize=True,
            quality=quality,
        )

        return image_path

    @staticmethod
    def get_image_size(
        image_path: str,
    ):
        """
        Return image dimensions.
        """

        image = Image.open(image_path)

        return image.size

    @staticmethod
    def delete_image(
        image_path: str,
    ) -> bool:
        """
        Delete image.
        """

        if os.path.exists(image_path):
            os.remove(image_path)
            return True

        return False
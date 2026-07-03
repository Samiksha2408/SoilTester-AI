import os
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status


class FileUpload:

    # Allowed file extensions
    ALLOWED_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
    }

    # Maximum file size (10 MB)
    MAX_FILE_SIZE = 10 * 1024 * 1024

    @staticmethod
    def save_file(
        file: UploadFile,
        upload_dir: str,
    ) -> str:
        """
        Save uploaded file and return its path.
        """

        Path(upload_dir).mkdir(
            parents=True,
            exist_ok=True,
        )

        extension = Path(file.filename).suffix.lower()

        if extension not in FileUpload.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type.",
            )

        contents = file.file.read()

        if len(contents) > FileUpload.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size exceeds 10 MB.",
            )

        filename = (
            f"{uuid.uuid4()}{extension}"
        )

        file_path = os.path.join(
            upload_dir,
            filename,
        )

        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        return file_path

    @staticmethod
    def delete_file(
        file_path: str,
    ) -> bool:
        """
        Delete file if it exists.
        """

        if os.path.exists(file_path):
            os.remove(file_path)
            return True

        return False
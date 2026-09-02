import os
import uuid


UPLOAD_DIR = "uploads/original"


def save_uploaded_file(upload_file):

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )

    extension = os.path.splitext(
        upload_file.filename
    )[1]

    filename = f"{uuid.uuid4()}{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(filepath, "wb") as buffer:
        buffer.write(
            upload_file.file.read()
        )

    return filepath
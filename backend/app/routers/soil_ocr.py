import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from app.utils.file_handler import save_uploaded_file

from app.services.image_preprocessing import (
    preprocess_image
)

from app.services.ocr_service import (
    OCRService
)

from app.services.soil_parser import (
    SoilParser
)

from app.services.pdf_service import (
    pdf_to_images
)


router = APIRouter(
    prefix="/soil-ocr",
    tags=["Soil OCR"]
)


# Services
ocr_service = OCRService()
soil_parser = SoilParser()


@router.post("/extract")
async def extract_soil_report(
    file: UploadFile = File(...)
):

    # --------------------------------
    # 1. Allowed file types
    # --------------------------------

    allowed_extensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf"
    ]

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is required"
        )

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG and PDF files are supported"
        )


    # --------------------------------
    # 2. Save original file
    # --------------------------------

    try:

        original_path = save_uploaded_file(file)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Unable to save uploaded file: {str(e)}"
        )


    # --------------------------------
    # 3. Create directories
    # --------------------------------

    os.makedirs(
        "uploads/processed",
        exist_ok=True
    )

    os.makedirs(
        "uploads/pdf_pages",
        exist_ok=True
    )


    # --------------------------------
    # 4. IMAGE FILE
    # --------------------------------

    if extension in [
        ".jpg",
        ".jpeg",
        ".png"
    ]:

        processed_path = os.path.join(
            "uploads",
            "processed",
            os.path.basename(original_path)
        )

        try:

            preprocess_image(
                original_path,
                processed_path
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"Image preprocessing failed: {str(e)}"
            )


        # OCR
        try:

            extracted_text = (
                ocr_service.extract_text(
                    processed_path
                )
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"OCR failed: {str(e)}"
            )


    # --------------------------------
    # 5. PDF FILE
    # --------------------------------

    else:

        try:

            pdf_images = pdf_to_images(
                original_path,
                "uploads/pdf_pages"
            )

        except Exception as e:

            raise HTTPException(
                status_code=500,
                detail=f"PDF conversion failed: {str(e)}"
            )


        extracted_text = []


        # Process every PDF page
        for index, image_path in enumerate(
            pdf_images
        ):

            processed_path = os.path.join(
                "uploads",
                "processed",
                f"pdf_page_{index + 1}.png"
            )


            # Preprocess page
            try:

                preprocess_image(
                    image_path,
                    processed_path
                )

            except Exception as e:

                raise HTTPException(
                    status_code=500,
                    detail=(
                        f"Preprocessing failed "
                        f"on PDF page {index + 1}: {str(e)}"
                    )
                )


            # OCR page
            try:

                page_text = (
                    ocr_service.extract_text(
                        processed_path
                    )
                )

                extracted_text.extend(
                    page_text
                )

            except Exception as e:

                raise HTTPException(
                    status_code=500,
                    detail=(
                        f"OCR failed on "
                        f"PDF page {index + 1}: {str(e)}"
                    )
                )


    # --------------------------------
    # 6. Parse soil parameters
    # --------------------------------

    try:

        soil_data = soil_parser.parse(
            extracted_text
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Soil parsing failed: {str(e)}"
        )


    # --------------------------------
    # 7. Final response
    # --------------------------------

    return {

        "success": True,

        "file": file.filename,

        "extracted_text": extracted_text,

        "soil_parameters": soil_data

    }
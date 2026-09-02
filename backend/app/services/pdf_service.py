import os

from pdf2image import convert_from_path


def pdf_to_images(
    pdf_path: str,
    output_dir: str
):
    """
    Convert all PDF pages into PNG images.
    """

    os.makedirs(
        output_dir,
        exist_ok=True
    )

    pages = convert_from_path(
        pdf_path,
        dpi=200
    )

    image_paths = []

    for index, page in enumerate(pages):

        image_path = os.path.join(
            output_dir,
            f"page_{index + 1}.png"
        )

        page.save(
            image_path,
            "PNG"
        )

        image_paths.append(
            image_path
        )

    return image_paths
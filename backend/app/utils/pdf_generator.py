import os
from pathlib import Path

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


class PDFGenerator:
    """
    Utility class for generating PDF reports.
    """

    @staticmethod
    def generate_soil_report(
        report_data: dict,
        output_dir: str = "reports",
    ) -> str:
        """
        Generate a soil report PDF.

        Returns:
            Path of generated PDF.
        """

        Path(output_dir).mkdir(
            parents=True,
            exist_ok=True,
        )

        filename = f"soil_report_{report_data['report_id']}.pdf"

        pdf_path = os.path.join(
            output_dir,
            filename,
        )

        document = SimpleDocTemplate(pdf_path)

        styles = getSampleStyleSheet()

        elements = []

        elements.append(
            Paragraph(
                "<b>SoilTester AI - Soil Report</b>",
                styles["Title"],
            )
        )

        elements.append(Spacer(1, 20))

        for key, value in report_data.items():

            elements.append(
                Paragraph(
                    f"<b>{key.replace('_', ' ').title()}:</b> {value}",
                    styles["BodyText"],
                )
            )

            elements.append(Spacer(1, 8))

        document.build(elements)

        return pdf_path
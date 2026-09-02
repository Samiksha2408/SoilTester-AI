import re


class SoilParser:

    @staticmethod
    def find_value(text, patterns):

        for pattern in patterns:

            match = re.search(
                pattern,
                text,
                re.IGNORECASE
            )

            if match:
                try:
                    return float(match.group(1))
                except ValueError:
                    pass

        return None

    def parse(self, texts):

        full_text = " ".join(texts)

        result = {
            "ph": self.find_value(
                full_text,
                [
                    r"\bpH\b\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "nitrogen": self.find_value(
                full_text,
                [
                    r"nitrogen\s*[:\-]?\s*(\d+(?:\.\d+)?)",
                    r"\bN\b\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "phosphorus": self.find_value(
                full_text,
                [
                    r"phosphorus\s*[:\-]?\s*(\d+(?:\.\d+)?)",
                    r"\bP\b\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "potassium": self.find_value(
                full_text,
                [
                    r"potassium\s*[:\-]?\s*(\d+(?:\.\d+)?)",
                    r"\bK\b\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "organic_carbon": self.find_value(
                full_text,
                [
                    r"organic\s+carbon\s*[:\-]?\s*(\d+(?:\.\d+)?)",
                    r"organic\s+C\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "electrical_conductivity": self.find_value(
                full_text,
                [
                    r"electrical\s+conductivity\s*[:\-]?\s*(\d+(?:\.\d+)?)",
                    r"\bEC\b\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            ),

            "moisture": self.find_value(
                full_text,
                [
                    r"moisture\s*[:\-]?\s*(\d+(?:\.\d+)?)"
                ]
            )
        }

        return result
from pydantic import BaseModel
from typing import Optional, List


class SoilOCRResponse(BaseModel):

    success: bool

    extracted_text: List[str]

    ph: Optional[float] = None

    nitrogen: Optional[float] = None

    phosphorus: Optional[float] = None

    potassium: Optional[float] = None

    organic_carbon: Optional[float] = None

    electrical_conductivity: Optional[float] = None

    moisture: Optional[float] = None
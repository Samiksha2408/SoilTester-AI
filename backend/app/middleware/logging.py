import logging
import time

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


# Configure logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("soiltester-ai")


class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware to log incoming requests and outgoing responses.
    """

    async def dispatch(self, request: Request, call_next):

        start_time = time.time()

        logger.info(
            f"Incoming Request: "
            f"{request.method} {request.url.path}"
        )

        response = await call_next(request)

        process_time = time.time() - start_time

        logger.info(
            f"Completed: "
            f"{request.method} {request.url.path} "
            f"Status: {response.status_code} "
            f"Time: {process_time:.4f}s"
        )

        return response
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from app.auth.jwt import verify_access_token


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware for validating JWT tokens on protected routes.
    """

    EXCLUDED_PATHS = {
        "/",
        "/docs",
        "/redoc",
        "/openapi.json",
        "/auth/login",
        "/auth/register",
    }

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        # Skip authentication for public routes
        if path in self.EXCLUDED_PATHS:
            return await call_next(request)

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Authorization header missing"
                },
            )

        if not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid authorization header"
                },
            )

        token = auth_header.split(" ")[1]

        payload = verify_access_token(token)

        if payload is None:
            return JSONResponse(
                status_code=401,
                content={
                    "detail": "Invalid or expired token"
                },
            )

        request.state.user = payload

        response = await call_next(request)

        return response
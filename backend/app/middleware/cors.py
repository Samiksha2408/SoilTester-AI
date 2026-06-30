from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI


def setup_cors(app: FastAPI):
    """
    Configure CORS middleware.
    """

    app.add_middleware(
        CORSMiddleware,

        # Frontend URLs
        allow_origins=[
            "http://localhost:3000",   # React
            "http://localhost:5173",   # Vite
            "http://127.0.0.1:5173",
        ],

        # Allow cookies and authentication
        allow_credentials=True,

        # Allow all HTTP methods
        allow_methods=[
            "*"
        ],

        # Allow all request headers
        allow_headers=[
            "*"
        ],

        # Expose response headers
        expose_headers=[
            "*"
        ],
    )
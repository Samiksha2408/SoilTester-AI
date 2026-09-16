import os
from typing import Optional
from dotenv import load_dotenv

try:
    from google import genai
except ImportError:
    genai = None

from .memory import ChatMemory
from .prompt import SYSTEM_PROMPT

load_dotenv()

class SoilChatbot:
    """
    AI-powered agricultural chatbot for SoilTester-AI.

    Uses Gemini for natural-language responses and maintains
    short-term conversation memory.
    """

    def __init__(self):
        if genai is None:
            raise ModuleNotFoundError(
                "The Google GenAI SDK is not installed. Install backend requirements to use the chatbot."
            )

        self.memory = ChatMemory()

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY is not configured."
            )

        self.client = genai.Client(
            api_key=api_key
        )

        self.model_name = os.getenv(
            "GEMINI_MODEL",
            "gemini-3.6-flash"
        )

    def generate_response(
        self,
        user_message: str,
        context: Optional[str] = None,
    ) -> str:

        self.memory.add_message(
            "user",
            user_message,
        )

        history = self.memory.get_history()

        prompt_parts = [
            SYSTEM_PROMPT
        ]

        # Add SoilTester user context if available
        if context:
            prompt_parts.append(
                f"""
USER AGRICULTURE CONTEXT:

{context}
"""
            )

        # Add previous conversation
        if history:

            prompt_parts.append(
                "\nCONVERSATION HISTORY:"
            )

            for message in history[:-1]:

                prompt_parts.append(
                    f"{message['role'].upper()}: "
                    f"{message['message']}"
                )

        # Add current question
        prompt_parts.append(
            f"""
CURRENT USER QUESTION:

{user_message}
"""
        )

        prompt = "\n\n".join(prompt_parts)

        try:

            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )

            answer = response.text.strip()

        except Exception as e:

            print(
                f"SoilTester AI chatbot error: {e}"
            )

            answer = (
                "I'm sorry, I couldn't process your "
                "question right now. Please try again."
            )

        self.memory.add_message(
            "assistant",
            answer,
        )

        return answer

    def conversation(self):

        return {
            "system_prompt": SYSTEM_PROMPT,
            "history": self.memory.get_history(),
        }

    def clear_memory(self):

        self.memory.clear()
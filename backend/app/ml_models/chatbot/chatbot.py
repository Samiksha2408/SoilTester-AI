from .memory import ChatMemory
from .prompt import SYSTEM_PROMPT


class SoilChatbot:
    """
    Basic chatbot implementation.

    Replace the generate_response() method with
    Gemini, OpenAI, Ollama, or another LLM later.
    """

    def __init__(self):

        self.memory = ChatMemory()

    def generate_response(
        self,
        user_message: str,
    ):

        self.memory.add_message(
            "user",
            user_message,
        )

        response = (
            "Thank you for your question. "
            "The AI chatbot integration is currently under development. "
            "This module will soon provide personalized agricultural guidance."
        )

        self.memory.add_message(
            "assistant",
            response,
        )

        return response

    def conversation(self):

        return {
            "system_prompt": SYSTEM_PROMPT,
            "history": self.memory.get_history(),
        }

    def clear_memory(self):

        self.memory.clear()
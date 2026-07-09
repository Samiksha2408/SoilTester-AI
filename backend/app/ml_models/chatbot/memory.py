class ChatMemory:
    """
    Stores conversation history for the chatbot.
    """

    def __init__(self):
        self.history = []

    def add_message(
        self,
        role: str,
        message: str,
    ):

        self.history.append(
            {
                "role": role,
                "message": message,
            }
        )

    def get_history(self):

        return self.history

    def clear(self):

        self.history.clear()
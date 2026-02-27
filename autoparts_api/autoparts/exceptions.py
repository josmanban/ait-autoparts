class CriticalErrorException(Exception):
    def __init__(self, message, summary=None):
        super().__init__(message)
        self.summary = summary
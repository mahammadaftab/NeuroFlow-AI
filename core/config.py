from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "NeuroFlow AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # LLM Provider Configuration
    OPENAI_API_KEY: str = ""
    
    # Database Configuration (Defaults to SQLite for rapid dev)
    DATABASE_URL: str = "sqlite:///./neuroflow.db"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

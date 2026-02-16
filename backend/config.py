import os
from dotenv import load_dotenv
load_dotenv()
class Config:
    DEBUG=False
    TESTING=False
    SECRET_KEY=os.getenv('SECRET_KEY','dev-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL','sqlite:///social_shield.db')
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    INSTAGRAM_API_KEY=os.getenv('INSTAGRAM_API_KEY')
    FACEBOOK_API_KEY=os.getenv('FACEBOOK_API_KEY')
    INSTAGRAM_ACCESS_TOKEN=os.getenv('INSTAGRAM_ACCESS_TOKEN')
    CORS_ORIGINS=os.getenv('CORS_ORIGINS','*').split(',')
class DevelopmentConfig(Config):DEBUG=True
class ProductionConfig(Config):DEBUG=False
class TestingConfig(Config):
    TESTING=True
    SQLALCHEMY_DATABASE_URI='sqlite:///:memory:'
config={'development':DevelopmentConfig,'production':ProductionConfig,'testing':TestingConfig,'default':DevelopmentConfig}

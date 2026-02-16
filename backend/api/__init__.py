from flask import Blueprint
analysis_bp=Blueprint('analysis',__name__,url_prefix='/api/analysis')
import api.routes

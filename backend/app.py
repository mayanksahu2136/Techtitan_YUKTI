import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from api import analysis_bp
def create_app(c=None):
    c=c or os.getenv('FLASK_ENV','development')
    a=Flask(__name__)
    a.config.from_object(config[c])
    CORS(a, resources={r"/api/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"], "methods": ["GET", "POST", "OPTIONS"]}})
    a.register_blueprint(analysis_bp)
    @a.route('/',methods=['GET'])
    def i():return jsonify({'service':'Social Shield API','version':'1.0.0','status':'running','endpoints':{'health':'/api/analysis/health','auto_analysis':'/api/analysis/auto','manual_analysis':'/api/analysis/manual'}}),200
    @a.errorhandler(404)
    def e404(e):return jsonify({'error':'Route not found'}),404
    @a.errorhandler(500)
    def e500(e):return jsonify({'error':'Internal server error'}),500
    return a
if __name__=='__main__':
    a=create_app()
    a.run(host=os.getenv('FLASK_HOST','0.0.0.0'),port=int(os.getenv('FLASK_PORT',5000)),debug=os.getenv('FLASK_DEBUG',False))

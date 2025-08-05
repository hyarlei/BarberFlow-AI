"""
BarberFlow AI Service
Main Flask application for AI/ML services
"""

import logging
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Import services
from services.demand_forecasting import DemandForecastingService
from services.face_analysis import FaceAnalysisService
from services.predictive_analytics import PredictiveAnalyticsService
from services.recommendation_engine import RecommendationEngine

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app():
    """Create and configure Flask app"""
    app = Flask(__name__)
    
    # Enable CORS
    CORS(app)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['DATABASE_URL'] = os.getenv('DATABASE_URL')
    
    # Initialize services
    face_analysis = FaceAnalysisService()
    predictive_analytics = PredictiveAnalyticsService()
    recommendation_engine = RecommendationEngine()
    demand_forecasting = DemandForecastingService()
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({
            'status': 'healthy',
            'service': 'BarberFlow AI Service',
            'version': '1.0.0'
        })
    
    @app.route('/api/face-analysis', methods=['POST'])
    def analyze_face():
        """
        Analyze face features for style recommendations
        Expected: image file in form data
        """
        try:
            if 'image' not in request.files:
                return jsonify({'error': 'No image provided'}), 400
            
            image_file = request.files['image']
            if image_file.filename == '':
                return jsonify({'error': 'No image selected'}), 400
            
            # Analyze face
            result = face_analysis.analyze_face_shape(image_file)
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Face analysis error: {str(e)}")
            return jsonify({'error': 'Face analysis failed'}), 500
    
    @app.route('/api/predict-demand', methods=['POST'])
    def predict_demand():
        """
        Predict demand for services
        Expected: JSON with historical data
        """
        try:
            data = request.get_json()
            
            if not data or 'timeframe' not in data:
                return jsonify({'error': 'Invalid data provided'}), 400
            
            # Predict demand
            result = demand_forecasting.predict_demand(
                timeframe=data['timeframe'],
                historical_data=data.get('historical_data', [])
            )
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Demand prediction error: {str(e)}")
            return jsonify({'error': 'Demand prediction failed'}), 500
    
    @app.route('/api/recommend-services', methods=['POST'])
    def recommend_services():
        """
        Recommend services for a client
        Expected: JSON with client data
        """
        try:
            data = request.get_json()
            
            if not data or 'client_id' not in data:
                return jsonify({'error': 'Client ID is required'}), 400
            
            # Generate recommendations
            result = recommendation_engine.recommend_services(
                client_id=data['client_id'],
                client_history=data.get('history', []),
                preferences=data.get('preferences', {})
            )
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Recommendation error: {str(e)}")
            return jsonify({'error': 'Recommendation generation failed'}), 500
    
    @app.route('/api/analyze-churn-risk', methods=['POST'])
    def analyze_churn_risk():
        """
        Analyze client churn risk
        Expected: JSON with client data
        """
        try:
            data = request.get_json()
            
            if not data or 'client_data' not in data:
                return jsonify({'error': 'Client data is required'}), 400
            
            # Analyze churn risk
            result = predictive_analytics.analyze_churn_risk(data['client_data'])
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Churn analysis error: {str(e)}")
            return jsonify({'error': 'Churn analysis failed'}), 500
    
    @app.route('/api/optimize-pricing', methods=['POST'])
    def optimize_pricing():
        """
        Optimize pricing based on demand and other factors
        Expected: JSON with service and market data
        """
        try:
            data = request.get_json()
            
            if not data or 'service_id' not in data:
                return jsonify({'error': 'Service ID is required'}), 400
            
            # Optimize pricing
            result = predictive_analytics.optimize_pricing(
                service_id=data['service_id'],
                current_price=data.get('current_price'),
                demand_data=data.get('demand_data', {}),
                market_data=data.get('market_data', {})
            )
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            logger.error(f"Pricing optimization error: {str(e)}")
            return jsonify({'error': 'Pricing optimization failed'}), 500
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"Starting BarberFlow AI Service on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)

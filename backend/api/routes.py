from flask import request, jsonify
from datetime import datetime
from . import analysis_bp
from ml import calculate_trust_score, extract_features
from nlp import analyze_text
def _risk(s):return'safe'if s>=71 else'suspicious'if s>=41 else'high_risk'
@analysis_bp.route('/auto',methods=['POST'])
def auto_analysis():
    try:
        d=request.get_json()
        p,u=d.get('platform','').lower(),d.get('profile_url','')
        if not p or not u:return jsonify({'error':'Missing platform or profile_url'}),400
        pd=extract_features(p,u)
        if not pd:
            return jsonify({
                'success': False,
                'error': f'Failed to fetch real profile data for {u}. Please verify the URL or try again later.',
                'details': 'API connection failure or invalid token.'
            }), 503
        
        pd['nlp_analysis'] = analyze_text(pd.get('bio', ''), pd.get('username', ''))
        ts,b=calculate_trust_score(pd,mode='auto')
        return jsonify({'success':True,'trust_score':ts,'risk_level':_risk(ts),'breakdown':b,'profile_data':pd}),200
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({'success': False, 'error': f'Internal Server Error: {str(e)}'}), 500
@analysis_bp.route('/manual',methods=['POST'])
def manual_analysis():
    try:
        # Support both JSON and Form data for manual analysis
        if request.is_json:
            data = request.get_json()
            is_json = True
        else:
            data = request.form
            is_json = False

        # Extract basic info
        platform = data.get('platform', '').lower()
        bio = data.get('bio', '')
        username = data.get('username', '')
        
        # Calculate followers ratio
        followers = int(data.get('follower_count' if not is_json else 'followers', 0))
        following = int(data.get('following_count' if not is_json else 'following', 0))
        ratio = followers / following if following > 0 else followers
        
        md = {
            'platform': platform,
            'bio': bio,
            'username': username,
            'nlp_analysis': analyze_text(bio, username),
            'features': {
                'follower_following_ratio': ratio,
                'username_randomness': sum(not c.isalnum() for c in username) / len(username) if username else 0,
                'post_repetition': int(data.get('repetitive_posts', 0)), 
                'username_length': len(username)
            },
            'raw_stats': {
                'followers': followers,
                'following': following,
                'posts': int(data.get('post_count', 0)),
                'screenshots': len(request.files.getlist('screenshots')) if not is_json else 0,
                'repetitive_posts': int(data.get('repetitive_posts', 0))
            }
        }
        
        ts, b = calculate_trust_score(md, mode='manual')
        return jsonify({
            'success': True,
            'trust_score': ts,
            'risk_level': _risk(ts),
            'breakdown': b,
            'processed_data': md
        }), 200
    except Exception as e:
        print(f"Manual Analysis Error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
@analysis_bp.route('/benchmark', methods=['GET'])
def benchmark_system():
    try:
        from ml import run_benchmark
        report = run_benchmark()
        return jsonify({
            'success': True,
            'timestamp': datetime.now().isoformat(),
            'report': report
        }), 200
    except Exception as e:
        print(f"Benchmark Error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@analysis_bp.route('/health',methods=['GET'])
def health_check():return jsonify({'status':'ok','service':'Social Shield Analysis API'}),200

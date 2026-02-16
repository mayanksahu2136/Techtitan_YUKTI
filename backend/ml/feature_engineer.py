from utils.api_handler import fetch_instagram_data, fetch_facebook_data
class FeatureEngineer:
    @staticmethod
    def engagement_ratio(f,e):
        if f is None or e is None: return None
        return(e/f)*100 if f else 0
    @staticmethod
    def follower_following_ratio(f,fo):
        if f is None or fo is None: return None
        return f/fo if fo else f
    @staticmethod
    def username_randomness(u):
        if not u: return None
        digits = sum(c.isdigit() for c in u)
        specials = sum(not c.isalnum() for c in u)
        return (digits + specials) / len(u)

def extract_features(p,url):
    try:
        d=fetch_instagram_data(url) if p.lower()=='instagram' else fetch_facebook_data(url) if p.lower()=='facebook' else None
        if not d:return None
        e=FeatureEngineer()
        
        # Extract individual components for the 4-parameter formula
        # 1. Bio Scam Keywords (via NLP analyzer)
        # 2. Username characteristics
        # 3. Post repetition (Mocked as 0 for now as Basic API doesn't provide post content)
        # 4. Follower-to-Following ratio
        
        d['features']={
            'follower_following_ratio': e.follower_following_ratio(d.get('followers'), d.get('following')),
            'username_randomness': e.username_randomness(d.get('username')),
            'post_repetition': 0, # Placeholder for Basic API
            'username_length': len(d.get('username', ''))
        }
        return d
    except Exception as e:return None

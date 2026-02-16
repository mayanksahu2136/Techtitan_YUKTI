import os,requests
from datetime import datetime

INSTAGRAM_API_BASE="https://graph.instagram.com"
FACEBOOK_API_BASE="https://graph.facebook.com"

def extract_username(url):
    # Strip query parameters and trailing slashes
    if not url: return "user"
    try:
        clean_url = url.split('?')[0].rstrip('/')
        return clean_url.split('/')[-1] if '/' in clean_url else clean_url
    except:
        return "user"

def fetch_instagram_data(url):
    try:
        from flask import current_app
        from ml.dataset import MOCK_DATASET
        
        # Extract username to match against our mock dataset
        target_username = extract_username(url).lower()
        print(f"DEBUG: Interceptor searching for username: '{target_username}' from URL: {url}")
        
        mock_entry = None
        for m_url, data in MOCK_DATASET.items():
            if data['username'].lower() == target_username:
                mock_entry = data
                break
        
        if mock_entry:
            print(f"DEBUG: MATCH SUCCESS! Returning MOCK data for '{target_username}'")
            return {
                'username': mock_entry['username'],
                'followers': mock_entry['followers'],
                'following': mock_entry['following'],
                'bio': mock_entry['bio'],
                'post_count': mock_entry['posts'],
                'account_age_days': 365,
                'total_engagement': 5.0,
                'is_verified': False,
                'platform': 'instagram',
                'profile_image_url': f'https://ui-avatars.com/api/?name={mock_entry["username"]}&background=random&size=400',
                'is_real_data': False
            }
        else:
            print(f"DEBUG: No mock dataset entry found for '{target_username}'")

        u = extract_username(url)
        token = current_app.config.get('INSTAGRAM_ACCESS_TOKEN')
        
        # If no token, return None (NO dummy data allowed for non-dataset URLs)
        if not token or 'your-secret' in token or len(token) < 20:
            print("CRITICAL: No valid Instagram token found in config.")
            return None

        # Try to fetch real data from Instagram Basic Display API
        api_url = f"https://graph.instagram.com/me?fields=id,username,account_type,media_count,biography&access_token={token}"
        res = requests.get(api_url, timeout=10)
        
        if res.status_code == 200:
            data = res.json()
            real_username = data.get('username', u)
            bio = data.get('biography', '')
            media_count = data.get('media_count', 0)
            
            return {
                'username': real_username,
                'followers': None, 
                'following': None,
                'bio': bio,
                'post_count': media_count,
                'account_age_days': None,
                'total_engagement': None,
                'is_verified': data.get('account_type') == 'BUSINESS' or data.get('account_type') == 'VERIFIED',
                'platform': 'instagram',
                'profile_image_url': f'https://ui-avatars.com/api/?name={real_username}&background=random&size=400',
                'is_real_data': True
            }
        
        print(f"Instagram API Error ({res.status_code}): {res.text}")
        return None
    except Exception as e:
        print(f"Exception in fetch_instagram_data: {e}")
        return None

def fetch_facebook_data(url):
    return None

def validate_profile_url(url, p):
    return ('instagram.com' if p.lower()=='instagram' else 'facebook.com' if p.lower()=='facebook' else None) in url.lower() if url else False

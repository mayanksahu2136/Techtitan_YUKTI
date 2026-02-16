import re

class NLPAnalyzer:
    def __init__(self):
        # Weighted keywords: Higher value = Higher Risk (0.1 to 1.0)
        self.risk_indicators = {
            # High Alert (Scam certainties)
            'crypto': 0.8, 'forex': 0.8, 'investment': 0.7, 'guaranteed profit': 0.9,
            'rich fast': 0.9, 'double your money': 1.0, 'passive income': 0.7,
            
            # Actionable Scams
            'dm for promo': 0.6, 'giveaway winner': 0.8, 'click here': 0.5,
            'whatsapp me': 0.7, 'telegram': 0.6, 'link in bio': 0.4,
            
            # Subtle Cautions
            'official account': 0.3, 'verified': 0.2, 'business': 0.1
        }
        
        # Regex patterns for suspicious strings
        self.patterns = {
            'crypto_wallet': r'\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b', # BTC address
            'obscured_contact': r'(w\.h\.a\.t\.s\.a\.p\.p|t\.e\.l\.e\.g\.r\.a\.m)',
            'excessive_emojis': r'[^\w\s]{5,}', # 5+ symbols/emojis in a row
            'phone_number': r'\b\d{10,12}\b'
        }

    def analyze_bio(self, bio):
        if not bio:
            return {'score': 0.0, 'found': [], 'reason': 'Empty biography'}
        
        bio_lower = bio.lower()
        found = []
        risk_score = 0.0
        
        # 1. Keyword Weighting
        for keyword, weight in self.risk_indicators.items():
            if keyword in bio_lower:
                found.append(keyword)
                risk_score += weight
        
        # 2. Pattern Recognition
        pattern_matches = 0
        for name, regex in self.patterns.items():
            if re.search(regex, bio_lower):
                pattern_matches += 1
                risk_score += 0.5
                found.append(f"[Pattern: {name}]")

        # Normalize score (0.0 safe, 1.0 scam)
        # We cap it at 1.0
        final_score = min(risk_score, 1.0)
        
        if final_score > 0.7:
            reason = "High likelihood of scam activity detected in bio"
        elif final_score > 0.3:
            reason = "Bio contains several promotional or suspicious triggers"
        else:
            reason = "Bio appears clean and professional"
            
        return {
            'score': final_score,
            'found': found,
            'reason': reason
        }

    def analyze_username(self, username):
        if not username:
            return {'score': 0.5, 'reason': 'Username missing', 'randomness': 0}
        
        # Granular randomness check
        digits = sum(c.isdigit() for c in username)
        specials = sum(not c.isalnum() for c in username)
        length = len(username)
        
        # Higher ratio of non-alphas = Higher risk
        randomness_ratio = (digits + (specials * 1.5)) / length
        
        # Length penalty
        length_penalty = 0.3 if length < 4 or length > 25 else 0
        
        # Dynamic scoring
        total_risk = min((randomness_ratio * 1.2) + length_penalty, 1.0)
        
        if total_risk > 0.6:
            reason = "Username has bot-like characteristics (high randomness)"
        elif total_risk > 0.3:
            reason = "Username contains unusual character combinations"
        else:
            reason = "Username follows natural naming patterns"
            
        return {
            'score': total_risk,
            'randomness': round(randomness_ratio, 2),
            'reason': reason
        }

def analyze_text(bio='', username=''):
    analyzer = NLPAnalyzer()
    return {
        'bio': analyzer.analyze_bio(bio),
        'username': analyzer.analyze_username(username)
    }

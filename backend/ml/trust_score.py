class TrustScoreCalculator:
    def __init__(self):
        # Fixed Weights as requested
        self.weights = {
            'bio_keywords': 0.30,
            'username_metrics': 0.20,
            'post_repetition': 0.20,
            'follower_ratio': 0.30
        }

    def calculate_trust_score(self, data, mode='auto'):
        breakdown = {}
        total_score = 0
        
        # 1. Bio Scam Keywords (from NLP)
        nlp = data.get('nlp_analysis', {})
        bio_result = nlp.get('bio', {'score': 0})
        # Score is naturally 0 (good) to 1 (bad). We want 1 (good) to 0 (bad).
        bio_score = 1.0 - bio_result.get('score', 0)
        breakdown['bio_scam_keywords'] = {
            'score': round(bio_score * 100),
            'weight': self.weights['bio_keywords'],
            'reason': bio_result.get('reason', 'N/A'),
            'metric': f"{len(bio_result.get('found', []))} keywords"
        }
        total_score += bio_score * self.weights['bio_keywords']

        # 2. Username Characteristics
        user_result = nlp.get('username', {'score': 0})
        user_score = 1.0 - user_result.get('score', 0)
        breakdown['username_characteristics'] = {
            'score': round(user_score * 100),
            'weight': self.weights['username_metrics'],
            'reason': user_result.get('reason', 'N/A'),
            'metric': f"Randomness: {user_result.get('randomness', 0):.2f}"
        }
        total_score += user_score * self.weights['username_metrics']

        # 3. Post Repetition
        # Currently placeholder due to API limits, but included in formula
        features = data.get('features', {})
        post_rep = features.get('post_repetition', 0)
        post_score = 1.0 - min(post_rep / 10, 1.0) # Assume 10+ repetitions is bad
        breakdown['post_repetition'] = {
            'score': round(post_score * 100),
            'weight': self.weights['post_repetition'],
            'reason': "Post content similarity within normal limits" if post_score > 0.8 else "Detected repetitive posts",
            'metric': f"{post_rep} repeats"
        }
        total_score += post_score * self.weights['post_repetition']

        # 4. Follower-to-Following Ratio
        ratio = features.get('follower_following_ratio')
        if ratio is None:
            ratio_score = 0.5 # Neutral if unavailable
            metric_text = "N/A"
            reason = "Ratio unavailable from current API"
        else:
            # High ratio is generally better for trust (followers > following)
            ratio_score = min(ratio / 2.0, 1.0) if ratio < 1 else 0.8 + min(ratio/100, 0.2)
            metric_text = f"{ratio:.2f}"
            reason = "Healthy social ratio" if ratio_score > 0.6 else "Suspiciously low social reach"
            
        breakdown['follower_ratio'] = {
            'score': round(ratio_score * 100),
            'weight': self.weights['follower_ratio'],
            'reason': reason,
            'metric': metric_text
        }
        total_score += ratio_score * self.weights['follower_ratio']

        final_ts = round(total_score * 100)
        return final_ts, breakdown

def calculate_trust_score(d, mode='auto'):
    return TrustScoreCalculator().calculate_trust_score(d, mode)

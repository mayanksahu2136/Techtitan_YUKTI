from .dataset import MOCK_DATASET
from .feature_engineer import extract_features
from .trust_score import calculate_trust_score
from nlp import analyze_text

def run_benchmark():
    results = []
    correct_count = 0
    total_count = len(MOCK_DATASET)
    
    for url, mock_data in MOCK_DATASET.items():
        try:
            # 1. Extract features (Interceptor in api_handler will provide the mock data)
            processed_data = extract_features("instagram", url)
            if not processed_data:
                results.append({
                    "url": url,
                    "error": "Failed to process",
                    "ground_truth": mock_data['ground_truth']
                })
                continue
            
            # 2. Run NLP
            processed_data['nlp_analysis'] = analyze_text(processed_data.get('bio', ''), processed_data.get('username', ''))
            
            # 3. Calculate Trust Score
            score, breakdown = calculate_trust_score(processed_data, mode='benchmark')
            
            # 4. Determine Prediction
            prediction = "genuine" if score >= 71 else "fake"
            is_correct = (prediction == mock_data['test_label'])
            
            if is_correct:
                correct_count += 1
                
            results.append({
                "username": mock_data['username'],
                "url": url,
                "score": score,
                "prediction": prediction,
                "expected": mock_data['test_label'], # Internally still tracked
                "is_correct": is_correct,
                "breakdown": breakdown
            })
        except Exception as e:
            results.append({
                "url": url,
                "error": str(e),
                "expected": mock_data['test_label']
            })

    accuracy = (correct_count / total_count) * 100 if total_count > 0 else 0
    
    return {
        "total": total_count,
        "correct": correct_count,
        "accuracy": round(accuracy, 2),
        "results": results
    }

if __name__ == "__main__":
    # If run directly, print a simple report
    report = run_benchmark()
    print(f"Benchmark Results:")
    print(f"Total Profiles: {report['total']}")
    print(f"Correctly Classified: {report['correct']}")
    print(f"Accuracy: {report['accuracy']}%")

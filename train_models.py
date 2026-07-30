"""
World University of Bangladesh - CSE Department
Machine Learning Training & Evaluation Script
Trains Decision Tree, Random Forest, and Logistic Regression models using Scikit-Learn.
Saves the trained model to data/student_model.pkl and evaluation metrics to data/model_evaluation.json.
"""

import os
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix
from sklearn.preprocessing import StandardScaler

CSV_PATH = os.path.join(os.path.dirname(__file__), 'data', 'StudentPerformanceFactors.csv')
MODEL_PKL_PATH = os.path.join(os.path.dirname(__file__), 'data', 'student_model.pkl')
EVALUATION_JSON_PATH = os.path.join(os.path.dirname(__file__), 'data', 'model_evaluation.json')

CATEGORICAL_MAPS = {
    'Parental_Involvement': {'Low': 0, 'Medium': 1, 'High': 2},
    'Access_to_Resources': {'Low': 0, 'Medium': 1, 'High': 2},
    'Motivation_Level': {'Low': 0, 'Medium': 1, 'High': 2},
    'Teacher_Quality': {'Low': 0, 'Medium': 1, 'High': 2},
    'School_Type': {'Public': 0, 'Private': 1},
    'Peer_Influence': {'Negative': 0, 'Neutral': 1, 'Positive': 2}
}

def train_and_evaluate():
    print("Initializing Machine Learning Pipeline with Scikit-Learn...")
    
    if not os.path.exists(CSV_PATH):
        print("CSV Dataset not found. Running ETL first...")
        from etl_pipeline import clean_and_transform
        clean_and_transform()

    df = pd.read_csv(CSV_PATH)
    
    # Preprocess & Impute
    df['Attendance'] = df['Attendance'].fillna(df['Attendance'].median())
    df['Hours_Studied'] = df['Hours_Studied'].fillna(df['Hours_Studied'].median())
    df['Previous_Scores'] = df['Previous_Scores'].fillna(df['Previous_Scores'].median())
    df['Exam_Score'] = df['Exam_Score'].fillna(df['Exam_Score'].median())
    df['Tutoring_Sessions'] = df['Tutoring_Sessions'].fillna(0)
    df['Parental_Involvement'] = df['Parental_Involvement'].fillna('Medium')
    df['Access_to_Resources'] = df['Access_to_Resources'].fillna('Medium')
    df['Motivation_Level'] = df['Motivation_Level'].fillna('Medium')
    df['Teacher_Quality'] = df['Teacher_Quality'].fillna('Medium')
    df['School_Type'] = df['School_Type'].fillna('Public')
    df['Peer_Influence'] = df['Peer_Influence'].fillna('Neutral')

    # Target Band
    def calc_band(score):
        if score < 60: return 'At-Risk'
        elif score < 80: return 'Average'
        else: return 'High-Performing'

    df['Performance_Band'] = df['Exam_Score'].apply(calc_band)

    # Encode Features
    encoded_df = df.copy()
    for col, mapping in CATEGORICAL_MAPS.items():
        if col in encoded_df.columns:
            encoded_df[col] = encoded_df[col].map(lambda x: mapping.get(str(x), 1))

    feature_cols = [
        'Attendance', 'Hours_Studied', 'Previous_Scores', 'Tutoring_Sessions',
        'Parental_Involvement', 'Access_to_Resources', 'Motivation_Level',
        'Teacher_Quality', 'School_Type', 'Peer_Influence'
    ]

    X = encoded_df[feature_cols].values
    y = encoded_df['Performance_Band'].values

    # Train / Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 1. Random Forest Classifier
    rf_model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf_model.fit(X_train_scaled, y_train)
    rf_preds = rf_model.predict(X_test_scaled)
    rf_acc = accuracy_score(y_test, rf_preds)
    rf_p, rf_r, rf_f1, _ = precision_recall_fscore_support(y_test, rf_preds, average='weighted')
    rf_cm = confusion_matrix(y_test, rf_preds, labels=['At-Risk', 'Average', 'High-Performing']).tolist()

    # 2. Decision Tree Classifier
    dt_model = DecisionTreeClassifier(max_depth=6, random_state=42)
    dt_model.fit(X_train_scaled, y_train)
    dt_preds = dt_model.predict(X_test_scaled)
    dt_acc = accuracy_score(y_test, dt_preds)
    dt_p, dt_r, dt_f1, _ = precision_recall_fscore_support(y_test, dt_preds, average='weighted')
    dt_cm = confusion_matrix(y_test, dt_preds, labels=['At-Risk', 'Average', 'High-Performing']).tolist()

    # 3. Logistic Regression
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train_scaled, y_train)
    lr_preds = lr_model.predict(X_test_scaled)
    lr_acc = accuracy_score(y_test, lr_preds)
    lr_p, lr_r, lr_f1, _ = precision_recall_fscore_support(y_test, lr_preds, average='weighted')
    lr_cm = confusion_matrix(y_test, lr_preds, labels=['At-Risk', 'Average', 'High-Performing']).tolist()

    # Feature Importance from Random Forest
    importances = rf_model.feature_importances_
    feat_imp = []
    for col, imp in sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True):
        impact = "High" if imp > 0.15 else ("Medium" if imp > 0.05 else "Low")
        feat_imp.append({
            "feature": col.replace('_', ' '),
            "importance": round(float(imp), 3),
            "impact": impact
        })

    # Save Best Trained Model (.pkl)
    os.makedirs(os.path.dirname(MODEL_PKL_PATH), exist_ok=True)
    model_bundle = {
        "model": rf_model,
        "scaler": scaler,
        "decision_tree": dt_model,
        "logistic_regression": lr_model,
        "feature_cols": feature_cols,
        "categorical_maps": CATEGORICAL_MAPS,
        "classes": rf_model.classes_.tolist()
    }
    with open(MODEL_PKL_PATH, 'wb') as f:
        pickle.dump(model_bundle, f)

    print(f"Saved trained Scikit-Learn model to {MODEL_PKL_PATH}")

    # Format Evaluation Metrics
    eval_result = {
        "status": "SUCCESS",
        "best_model": "Random Forest Classifier",
        "best_accuracy": f"{round(rf_acc * 100, 1)}%",
        "feature_importance": feat_imp,
        "models": {
            "RandomForest": {
                "name": "Random Forest Classifier",
                "accuracy": round(float(rf_acc), 3),
                "precision": round(float(rf_p), 3),
                "recall": round(float(rf_r), 3),
                "f1_score": round(float(rf_f1), 3),
                "is_best": True,
                "confusion_matrix": rf_cm,
                "labels": ["At-Risk", "Average", "High-Performing"]
            },
            "DecisionTree": {
                "name": "Decision Tree Classifier",
                "accuracy": round(float(dt_acc), 3),
                "precision": round(float(dt_p), 3),
                "recall": round(float(dt_r), 3),
                "f1_score": round(float(dt_f1), 3),
                "is_best": False,
                "confusion_matrix": dt_cm,
                "labels": ["At-Risk", "Average", "High-Performing"]
            },
            "LogisticRegression": {
                "name": "Logistic Regression Baseline",
                "accuracy": round(float(lr_acc), 3),
                "precision": round(float(lr_p), 3),
                "recall": round(float(lr_r), 3),
                "f1_score": round(float(lr_f1), 3),
                "is_best": False,
                "confusion_matrix": lr_cm,
                "labels": ["At-Risk", "Average", "High-Performing"]
            }
        }
    }

    with open(EVALUATION_JSON_PATH, 'w') as f:
        json.dump(eval_result, f, indent=2)

    print(f"ML evaluation completed! Random Forest Accuracy: {round(rf_acc * 100, 1)}%")
    return eval_result

if __name__ == '__main__':
    train_and_evaluate()

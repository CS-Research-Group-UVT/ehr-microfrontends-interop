import math
import json, joblib
import pandas as pd
import shap
import numpy as np

PIPELINE = joblib.load("/home/stefan.secrieru@canonical.com/PycharmProjects/CDSS_backend2/heart_attack_pipeline.pkl")

with open("/home/stefan.secrieru@canonical.com/PycharmProjects/CDSS_backend2/feature_names.json") as f:
    FEATURE_NAMES = json.load(f)

MODEL = PIPELINE.named_steps["model"]
EXPLAINER = shap.TreeExplainer(MODEL)

def _to_1d(arr):
    """Convert SHAP outputs to a clean 1D numpy array."""
    a = np.asarray(arr)
    return a.reshape(-1)

def explain_one(X_row: pd.DataFrame, top_k: int = 3):
    shap_vals = EXPLAINER.shap_values(X_row)

    # Binary classification: could be list per class OR a single array
    if isinstance(shap_vals, list):
        sv_raw = shap_vals[1]  # positive class
        base_raw = EXPLAINER.expected_value[1]
    else:
        sv_raw = shap_vals
        base_raw = EXPLAINER.expected_value

    # sv_raw could be (1, n_features) or (n_features,) or even (1, n_features, 1)
    sv = _to_1d(sv_raw)[-len(FEATURE_NAMES):]  # safest trim
    base = float(np.asarray(base_raw).reshape(-1)[0])

    impacts = []
    for i, feat in enumerate(FEATURE_NAMES):
        impacts.append({
            "feature": feat,
            "value": float(X_row.iloc[0, i]),
            "impact": float(sv[i]),
        })

    impacts.sort(key=lambda d: abs(d["impact"]), reverse=True)
    return {
        "method": "shap_tree",
        "base_value": round(base, 5),
        "top_contributors": impacts[:top_k],
    }

def predict_heart_attack(age: int, sex: int, chol: float, trestbps: float):
    x = {
        "age": age,
        "sex": sex,
        "chol": chol,
        "trestbps": trestbps,
    }
    X_row = pd.DataFrame([[x[f] for f in FEATURE_NAMES]], columns=FEATURE_NAMES)

    risk = float(PIPELINE.predict_proba(X_row)[:, 1][0])
    label = int(risk >= 0.5)

    return {
        "probability": round(risk, 4),
        "prediction": label,
        "explain": explain_one(X_row, top_k=4)
    }

def predict_sepsis(age: int, sex: int, chol: float, trestbps: float):
    """
    Replace this logic with your trained model inference.
    """

    # Simple logistic-style mock risk
    z = (
        0.04 * (age - 50)
        + 0.02 * (trestbps - 120)
        + 0.01 * (chol - 200)
        + 0.3 * sex
    )

    probability = 1 / (1 + math.exp(-z))

    return {
        "probability": round(float(probability), 4),
        "prediction": 1 if probability >= 0.5 else 0,  # 1 = risk
    }
from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model.preprocessing import preprocess_text


BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

MODEL_PATH = MODEL_DIR / "sentiment_model.pkl"
VECTORIZER_PATH = MODEL_DIR / "tfidf_vectorizer.pkl"

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

app = FastAPI(title="NLP Sentiment Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {
        "message": "NLP Sentiment Analysis API is running",
        "endpoint": "/predict",
    }


@app.post("/predict")
def predict_sentiment(request: PredictRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty")

    clean_text = preprocess_text(request.text)

    if not clean_text:
        raise HTTPException(
            status_code=400,
            detail="Text input is invalid after preprocessing",
        )

    text_vector = vectorizer.transform([clean_text])
    prediction = int(model.predict(text_vector)[0])

    probabilities = model.predict_proba(text_vector)[0]
    confidence = float(probabilities[prediction])

    sentiment_label = "Positif" if prediction == 1 else "Negatif"

    return {
        "original_text": request.text,
        "clean_text": clean_text,
        "sentiment": sentiment_label,
        "prediction": prediction,
        "confidence": round(confidence, 4),
    }
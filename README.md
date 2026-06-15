# Analisis Sentimen Ulasan Produk Bahasa Indonesia

## Deskripsi Proyek

Proyek ini merupakan implementasi Natural Language Processing (NLP) untuk melakukan analisis sentimen terhadap ulasan produk Bahasa Indonesia.

Sistem dapat mengklasifikasikan ulasan ke dalam dua kategori:

- Positif (1)
- Negatif (0)

Model machine learning dibangun menggunakan Logistic Regression dan TF-IDF Vectorizer, kemudian diimplementasikan ke dalam REST API menggunakan FastAPI serta antarmuka web menggunakan Next.js.

---

## Tujuan

Membangun sistem yang mampu:

- Melakukan preprocessing teks Bahasa Indonesia
- Mengubah teks menjadi representasi numerik menggunakan TF-IDF
- Melakukan klasifikasi sentimen menggunakan Logistic Regression
- Menyediakan API prediksi menggunakan FastAPI
- Menyediakan antarmuka pengguna berbasis web menggunakan Next.js

---

## Dataset

Dataset yang digunakan merupakan dataset ulasan produk Bahasa Indonesia yang berisi:

- Kolom reviews
- Kolom label

Keterangan label:

| Label | Sentimen |
|---------|---------|
| 0 | Negatif |
| 1 | Positif |

---

## Tahapan NLP

### 1. Data Cleaning

- Menghapus missing value
- Menghapus data duplikat
- Memastikan format label valid

### 2. Text Preprocessing

Tahapan preprocessing yang digunakan:

- Case Folding
- Menghapus URL
- Menghapus Mention
- Menghapus Hashtag
- Menghapus Emoji
- Menghapus Angka
- Menghapus Tanda Baca
- Tokenisasi
- Stopword Removal
- Stemming menggunakan Sastrawi

### 3. Feature Extraction

Menggunakan:

- TF-IDF Vectorizer

Parameter:

```python
max_features=5000
ngram_range=(1,2)
min_df=2
```

### 4. Model Machine Learning

Menggunakan:

```python
LogisticRegression(
    class_weight="balanced",
    max_iter=1000,
    random_state=42
)
```

---

## Evaluasi Model

Metrik evaluasi:

- Accuracy
- Precision
- Recall
- F1-Score
- Confusion Matrix

---

## Struktur Proyek

```text
nlp-sentiment-uas/
│
├── backend/
│   ├── dataset/
│   ├── model/
│   │   ├── sentiment_model.pkl
│   │   ├── tfidf_vectorizer.pkl
│   │   └── preprocessing.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
├── .gitignore
└── README.md
```

---

## Teknologi yang Digunakan

### Backend

- Python
- FastAPI
- Scikit-Learn
- Joblib
- Sastrawi
- Uvicorn

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Aktifkan virtual environment:

```bash
venv\Scripts\activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

Jalankan FastAPI:

```bash
python -m uvicorn main:app --reload
```

Backend berjalan pada:

```text
http://127.0.0.1:8000
```

---

## Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jalankan aplikasi:

```bash
npm run dev
```

Frontend berjalan pada:

```text
http://localhost:3000
```

---

## API Endpoint

### POST /predict

Request:

```json
{
  "text": "Produk ini sangat bagus dan pengirimannya cepat"
}
```

Response:

```json
{
  "sentiment": "Positif",
  "prediction": 1,
  "confidence": 0.95,
  "clean_text": "produk bagus kirim cepat"
}
```

---

## Pengembang

Nama: Excel Moreno & Bayu Jati

Program Studi: Informatika

Mata Kuliah: Natural Language Processing (NLP)

Universitas: [primakra University]

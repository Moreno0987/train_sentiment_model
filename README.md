# Analisis Sentimen Ulasan Produk Bahasa Indonesia

## Deskripsi Proyek

Proyek ini merupakan implementasi **Natural Language Processing (NLP)** untuk melakukan analisis sentimen terhadap ulasan produk berbahasa Indonesia.

Sistem mampu mengklasifikasikan ulasan ke dalam dua kategori sentimen, yaitu:

* **Positif (1)**
* **Negatif (0)**

Model machine learning dibangun menggunakan **Logistic Regression** dengan representasi fitur **TF-IDF Vectorizer**, kemudian diimplementasikan menjadi **REST API** menggunakan **FastAPI** dan antarmuka web menggunakan **Next.js**.

Proyek ini dikembangkan sebagai pemenuhan tugas **Ujian Akhir Semester (UAS)** mata kuliah **Natural Language Processing (NLP)** Program Studi Informatika Universitas Primakara.

---

# Tujuan

Membangun sistem yang mampu:

* Melakukan preprocessing teks Bahasa Indonesia
* Mengubah teks menjadi representasi numerik menggunakan TF-IDF
* Melakukan klasifikasi sentimen menggunakan Logistic Regression
* Menyediakan REST API menggunakan FastAPI
* Menyediakan aplikasi web berbasis Next.js yang dapat digunakan oleh pengguna

---

# Arsitektur Sistem

```
                 User
                   │
                   ▼
        Frontend (Next.js)
                   │
          HTTP Request (POST)
                   │
                   ▼
         FastAPI REST API
                   │
         Text Preprocessing
                   │
          TF-IDF Vectorizer
                   │
        Logistic Regression
                   │
                   ▼
      Hasil Prediksi Sentimen
```

---

# Dataset

Dataset yang digunakan merupakan **dataset ulasan produk berbahasa Indonesia** yang telah diberi label sentimen.

Dataset terdiri dari dua kolom utama:

* **reviews**
* **label**

Keterangan label:

| Label | Sentimen |
| ----- | -------- |
| 0     | Negatif  |
| 1     | Positif  |

Dataset kemudian melalui proses pembersihan data (cleaning) sebelum digunakan dalam proses pelatihan model.

---

# Tahapan NLP

## 1. Data Cleaning

Tahapan yang dilakukan:

* Menghapus missing value
* Menghapus data duplikat
* Memastikan format label valid

---

## 2. Text Preprocessing

Tahapan preprocessing yang digunakan:

* Case Folding
* Menghapus URL
* Menghapus Mention
* Menghapus Hashtag
* Menghapus Emoji
* Menghapus Angka
* Menghapus Tanda Baca
* Tokenisasi
* Stopword Removal
* Stemming menggunakan **Sastrawi**

---

## 3. Feature Extraction

Representasi fitur menggunakan:

* **TF-IDF Vectorizer**

Parameter yang digunakan:

```python
max_features=5000
ngram_range=(1,2)
min_df=2
```

---

## 4. Model Machine Learning

Model klasifikasi yang digunakan:

```python
LogisticRegression(
    class_weight="balanced",
    max_iter=1000,
    random_state=42
)
```

---

# Evaluasi Model

Model dievaluasi menggunakan beberapa metrik klasifikasi:

* Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix

Evaluasi dilakukan menggunakan data uji (test set) untuk mengukur kemampuan model dalam melakukan klasifikasi sentimen terhadap data yang belum pernah dilihat sebelumnya.

---

# Struktur Proyek

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

# Teknologi yang Digunakan

## Backend

* Python
* FastAPI
* Scikit-Learn
* Joblib
* Sastrawi
* Uvicorn

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

# Menjalankan Backend

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

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Buat file `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Jalankan aplikasi:

```bash
npm run dev
```

Frontend berjalan pada:

```
http://localhost:3000
```

---

# REST API

## POST `/predict`

Request

```json
{
  "text": "Produk ini sangat bagus dan pengirimannya cepat"
}
```

Response

```json
{
  "sentiment": "Positif",
  "prediction": 1,
  "confidence": 0.95,
  "clean_text": "produk bagus kirim cepat"
}
```

---

# Deployment

## Frontend (Vercel)

https://nlp-sentiment-frontend.vercel.app

> Ganti URL di atas dengan domain Vercel final proyekmu bila berbeda.

## Backend (Railway)

https://trainsentimentmodel-production.up.railway.app

## API Documentation

https://trainsentimentmodel-production.up.railway.app/docs

---

# Source Code

## Backend Repository

https://github.com/Moreno0987/train_sentiment_model

## Frontend Repository

https://github.com/Moreno0987/nlp-sentiment-frontend

---
---

# Pengembang

**Excel Moreno**

* Machine Learning
* Backend Development
* Frontend Development
* Deployment

**Bayu Jati**

* Training Model

---

# Mata Kuliah

Natural Language Processing (NLP)

Program Studi Informatika

Universitas Primakara

---

# Lisensi

Project ini dikembangkan untuk memenuhi tugas **Ujian Akhir Semester (UAS)** mata kuliah **Natural Language Processing (NLP)** Program Studi Informatika Universitas Primakara.

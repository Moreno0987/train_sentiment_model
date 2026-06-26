
import re
import string
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

# Inisialisasi Stopword Remover dan Stemmer (harus dilakukan sekali)
stopword_factory = StopWordRemoverFactory()
stopwords = stopword_factory.get_stop_words()
custom_stopwords = ['nya', 'sih', 'dong', 'deh', 'nih', 'tuh', 'kok', 'banget', 'bgtt', 'bgt']
stopwords.extend(custom_stopwords)
stopwords = list(set(stopwords)) # Hapus duplikat jika ada

stemmer_factory = StemmerFactory()
stemmer = stemmer_factory.create_stemmer()

def preprocess_text(text):
    # 1. Ubah teks menjadi string (penanganan input non-string)
    text = str(text) if not isinstance(text, str) else text

    # 2. Lowercase / Case Folding
    text = text.lower()

    # 3. Hapus URL
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)

    # 4. Hapus mention (@username)
    text = re.sub(r'@\w+', '', text)

    # 5. Hapus simbol hashtag '#' tetapi pertahankan katanya
    text = re.sub(r'#(\w+)', r'', text)

    # 6. Hapus emoji dan karakter non-ASCII (pertahankan alfabet dan angka)
    text = text.encode('ascii', 'ignore').decode('utf-8') # Hapus non-ascii

    # 7. Hapus angka
    text = re.sub(r'\d+', '', text)

    # 8. Hapus tanda baca
    text = text.translate(str.maketrans('', '', string.punctuation))

    # 9. Normalisasi spasi berlebih
    text = re.sub(r'\s+', ' ', text).strip()

    # Jika teks menjadi kosong setelah pembersihan, kembalikan string kosong
    if not text:
        return ""

    # 10. Tokenisasi sederhana menggunakan .split()
    tokens = text.split()

    # 11. Hapus stopword Bahasa Indonesia
    tokens = [word for word in tokens if word not in stopwords]

    # 12. Stemming menggunakan Sastrawi
    stemmed_tokens = [stemmer.stem(word) for word in tokens]

    # 13. Gabungkan token kembali menjadi string
    return ' '.join(stemmed_tokens)

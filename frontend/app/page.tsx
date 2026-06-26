"use client";

import { useState } from "react";
import {
  Cpu,
  SlidersHorizontal,
  Server,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

type PredictionResult = {
  sentiment: string;
  prediction: number;
  confidence: number;
  clean_text: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPositive = result?.prediction === 1;

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Masukkan ulasan terlebih dahulu.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Request gagal");

      setResult(await response.json());
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke backend. Coba lagi beberapa saat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 text-slate-900 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 md:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl ring-1 ring-primary/25">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <p className="text-xs font-semibold text-blue-300">UAS NLP</p>
          </div>

          <h1 className="mt-4 text-2xl font-black leading-tight">
            Analisis Sentimen Ulasan Produk
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Sistem klasifikasi sentimen Bahasa Indonesia berbasis TF-IDF,
            Logistic Regression, FastAPI, dan Next.js.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 text-sm md:grid-cols-1 md:gap-3">
            <div className="flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 md:flex-row md:items-center md:gap-3">
              <div className="rounded-xl bg-primary/15 p-2">
                <Cpu className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Model</p>
                <p className="text-xs font-bold md:text-sm">Logistic Regression</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 md:flex-row md:items-center md:gap-3">
              <div className="rounded-xl bg-primary/15 p-2">
                <SlidersHorizontal className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Feature Extraction</p>
                <p className="text-xs font-bold md:text-sm">TF-IDF</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 md:flex-row md:items-center md:gap-3">
              <div className="rounded-xl bg-primary/15 p-2">
                <Server className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Backend</p>
                <p className="text-xs font-bold md:text-sm">FastAPI</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 space-y-6">
          <div className="rounded-3xl bg-card p-6 shadow-xl shadow-slate-200/50 ring-1 ring-border/50">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-foreground">
                Input Ulasan
              </h2>
              <p className="mt-1 text-sm text-muted">
                Masukkan teks ulasan produk untuk dianalisis oleh model.
              </p>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              rows={7}
              className="w-full rounded-2xl border border-border bg-background p-4 text-sm leading-7 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="Contoh: Produknya bagus, kualitas sesuai, dan pengiriman cepat..."
            />

            {error && (
              <p className="mt-2 text-sm font-medium text-danger">{error}</p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="order-1 flex-1 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Menganalisis..." : "Analisis Sentimen"}
              </button>

              <button
                onClick={() => {
                  setText("");
                  setResult(null);
                  setError(null);
                }}
                className="order-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold text-muted transition hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-card p-6 shadow-xl shadow-slate-200/50 ring-1 ring-border/50">
            <h2 className="text-2xl font-black text-foreground">
              Hasil Prediksi
            </h2>

            {!result ? (
              <div className="mt-5 rounded-2xl border border-dashed border-border bg-background p-8 text-center text-muted">
                Belum ada hasil analisis.
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  <div
                    className={`flex items-center gap-4 rounded-2xl p-5 ${
                      isPositive
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {isPositive ? (
                      <CheckCircle2 className="h-9 w-9 shrink-0" />
                    ) : (
                      <XCircle className="h-9 w-9 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">Sentimen</p>
                      <p className="text-2xl font-black">{result.sentiment}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-background p-5 border border-border/30">
                    <p className="text-sm text-muted">Label</p>
                    <p className="mt-2 text-3xl font-black text-foreground">{result.prediction}</p>
                  </div>

                  <div className="rounded-2xl bg-background p-5 border border-border/30">
                    <p className="text-sm text-muted">Confidence</p>
                    <p className="mt-2 text-3xl font-black text-foreground">
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="mb-2 text-sm font-bold text-foreground">
                    Clean Text
                  </p>
                  <p className="text-sm leading-7 text-muted">
                    {result.clean_text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
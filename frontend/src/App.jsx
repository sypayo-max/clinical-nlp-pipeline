import { useState } from "react";
import TextInput from "./components/TextInput";
import ResultsTable from "./components/ResultsTable";
import History from "./components/History";

export default function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("extract");

  const handleExtract = async (text) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("http://localhost:8000/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Extraction failed.");
      }

      const data = await res.json();
      setResults(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Clinical NLP Pipeline
            </h1>
            <p className="text-sm text-gray-500">
              Medical entity extraction · RxNorm · SNOMED CT · LOINC
            </p>
          </div>
          <nav className="flex gap-2">
            <button
              onClick={() => setView("extract")}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                view === "extract"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Extract
            </button>
            <button
              onClick={() => setView("history")}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                view === "history"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              History
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {view === "extract" ? (
          <>
            <TextInput onExtract={handleExtract} loading={loading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            {results && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500">
                    Document ID:{" "}
                    <span className="font-mono font-medium text-gray-800">
                      #{results.document_id}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Entities found:{" "}
                    <span className="font-medium text-gray-800">
                      {results.entity_count}
                    </span>
                  </span>
                </div>
                <ResultsTable entities={results.entities} />
              </div>
            )}
          </>
        ) : (
          <History />
        )}
      </main>
    </div>
  );
}

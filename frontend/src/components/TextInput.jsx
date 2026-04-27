import React, { useState } from "react";

export default function TextInput({ onExtract, loading }) {
  const [text, setText] = useState("");

  function handleSample() {
    setText(
      `Patient presented with acute myocardial infarction.\n` +
      `Started on aspirin 81mg daily and metoprolol 25mg BID.\n` +
      `Troponin I elevated at 2.4 ng/mL.`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onExtract(text);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <label className="block">
        <span className="text-sm text-gray-800 font-medium">Clinical Text</span>
        <textarea
          className="mt-1 shadow-sm border rounded w-full px-3 py-2 h-32 resize-none text-sm font-mono"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter clinical or biomedical text here (diagnoses, medications, lab results, etc)"
          disabled={loading}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          className="text-xs px-3 py-1 rounded border border-blue-200 text-blue-800 bg-blue-50 hover:bg-blue-100"
          onClick={handleSample}
          disabled={loading}
        >
          Load sample text
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm"
          disabled={loading}
        >
          {loading ? "Extracting..." : "Extract Entities"}
        </button>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/history?limit=10")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch history");
        return r.json();
      })
      .then(setHistory)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-700">{error}</div>;
  if (!history.length) return <div className="text-gray-400">No history yet.</div>;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Recent Documents</h2>
      <table className="min-w-full text-sm border">
        <thead>
          <tr>
            <th className="text-left font-semibold py-1 px-2 border-b">ID</th>
            <th className="text-left font-semibold py-1 px-2 border-b">Timestamp</th>
            <th className="text-left font-semibold py-1 px-2 border-b">Entities</th>
          </tr>
        </thead>
        <tbody>
          {history.map((doc) => (
            <tr key={doc.document_id} className="hover:bg-blue-50 border-b">
              <td className="text-blue-900 font-mono px-2 py-1">{doc.document_id}</td>
              <td className="px-2 py-1">{new Date(doc.timestamp).toLocaleString()}</td>
              <td className="font-mono px-2 py-1">{doc.entity_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

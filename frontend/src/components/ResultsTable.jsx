import React from "react";

export default function ResultsTable({ entities }) {
  if (!entities || entities.length === 0) {
    return <div className="text-gray-400">No entities extracted for this document.</div>;
  }

  return (
    <table className="min-w-full text-xs border mt-2">
      <thead>
        <tr>
          <th className="text-left px-2 py-1 border-b">Entity</th>
          <th className="text-left px-2 py-1 border-b">Type</th>
          <th className="text-left px-2 py-1 border-b">Code System</th>
          <th className="text-left px-2 py-1 border-b">Code</th>
          <th className="text-left px-2 py-1 border-b">Score</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((row, idx) => (
          <tr key={idx} className="border-b hover:bg-blue-50">
            <td className="font-mono px-2 py-1">{row.text}</td>
            <td>{row.type}</td>
            <td>{row.vocab}</td>
            <td className="font-mono">{row.code}</td>
            <td>{row.score != null ? row.score.toFixed(2) : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

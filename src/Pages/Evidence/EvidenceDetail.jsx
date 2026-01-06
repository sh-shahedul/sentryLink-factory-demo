import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";

const EvidenceDetail = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const evidence = data.find((doc) => doc.id === parseInt(id));

  // Ensure versions is always an array
  const [versions, setVersions] = useState(
    Array.isArray(evidence?.versions) ? evidence.versions : []
  );
  const [showModal, setShowModal] = useState(false);

  // Modal form state
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState(""); // can default to evidence.expiry if desired
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  if (!evidence)
    return <div className="p-6 text-red-500">Document not found</div>;

  // Handle upload new version
  const handleUpload = (e) => {
    e.preventDefault();

    if (!notes.trim()) {
      setError("Notes are required");
      return;
    }

    const newVersion = {
      date: new Date().toLocaleDateString(),
      uploader: "Current User",
      notes,
      size: file ? `${(file.size / 1000).toFixed(2)} KB` : "N/A",
      expiry: expiry ? new Date(expiry).toLocaleDateString() : "N/A",
    };

    setVersions([...versions, newVersion]);

    // Reset modal state
    setNotes("");
    setExpiry("");
    setFile(null);
    setError("");
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Metadata */}
      <div className="mb-6  rounded-xl p-6 bg-indigo-50 shadow-sm">
        <h2 className="text-2xl font-bold mb-3 text-indigo-800">
          {evidence.docName}
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="px-4 py-1 rounded-full bg-indigo-600 text-white font-medium text-sm">
            {evidence.docType}
          </span>
          <span
            className={`px-4 py-1 rounded-full text-white font-medium text-sm ${
              evidence.status === "Expiring Soon"
                ? "bg-orange-500"
                : evidence.status === "Expired"
                ? "bg-gray-500"
                : "bg-green-600"
            }`}
          >
            {evidence.status}
          </span>
          <span className="text-indigo-700 font-medium">
            Expiry: {new Date(evidence.expiry).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Versions Table */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-indigo-700">Versions</h3>
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full border border-indigo-200 rounded-lg">
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-2 px-4 text-left">Version</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Uploader</th>
                <th className="py-2 px-4 text-left">Notes</th>
                <th className="py-2 px-4 text-left">File Size</th>
                <th className="py-2 px-4 text-left">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-indigo-50 transition-colors"
                >
                  <td className="py-2 px-4 font-medium text-indigo-700">v{i + 1}</td>
                  <td className="py-2 px-4">{v.date}</td>
                  <td className="py-2 px-4">{v.uploader}</td>
                  <td className="py-2 px-4">{v.notes}</td>
                  <td className="py-2 px-4">{v.size}</td>
                  <td className="py-2 px-4">{v.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload New Version Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-lg transition-all mb-4"
      >
        Upload New Version
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-indigo-700">
              Upload New Version
            </h3>

            {error && <p className="text-red-500 mb-2 font-medium">{error}</p>}

            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="border border-indigo-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="border border-indigo-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // optional: prevent past dates
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">File (optional)</label>
                <input
                  type="file"
                  className="border border-indigo-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md transition-all"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceDetail;

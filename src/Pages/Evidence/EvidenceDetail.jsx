// import React, { useState } from "react";
// import { useLoaderData, useParams } from "react-router";

// const EvidenceDetail = () => {
//   const { id } = useParams();
//   const data = useLoaderData(); 
//   const evidence = data.find((doc) => doc.id === parseInt(id));

//   const [versions, setVersions] = useState(evidence?.versionsList || []);

//   const [showModal, setShowModal] = useState(false);

//   if (!evidence) return <div>Document not found</div>;

//   return (
//     <div className="p-6">
//       {/* Metadata */}
//       <div className="mb-6 border rounded p-4 bg-gray-50">
//         <h2 className="text-xl font-bold mb-2">{evidence.docName}</h2>
//         <div className="flex flex-wrap gap-4 items-center">
//           <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">{evidence.docType}</span>
//           <span className={`px-3 py-1 rounded-full text-white text-sm ${evidence.status === 'Expiring Soon' ? 'bg-red-500' : 'bg-green-500'}`}>{evidence.status}</span>
//           <span>Expiry: {evidence.expiry}</span>
//         </div>
//       </div>

//       {/* Versions table */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">Versions</h3>
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 text-left">Version</th>
//               <th className="py-2 px-4 text-left">Date</th>
//               <th className="py-2 px-4 text-left">Uploader</th>
//               <th className="py-2 px-4 text-left">Notes</th>
//               <th className="py-2 px-4 text-left">File Size</th>
//             </tr>
//           </thead>
//           <tbody>
//             {versions.map((v, i) => (
//               <tr key={i} className="border-b hover:bg-gray-50">
//                 <td className="py-2 px-4">v{i+1}</td>
//                 <td className="py-2 px-4">{v.date}</td>
//                 <td className="py-2 px-4">{v.uploader}</td>
//                 <td className="py-2 px-4">{v.notes}</td>
//                 <td className="py-2 px-4">{v.size}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Upload New Version button */}
//       <button onClick={()=>setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Upload New Version</button>

//       {/* Modal (Optional: later implement UploadModal component) */}
//       {showModal && <div>Modal goes here</div>}
//     </div>
//   );
// };

// export default EvidenceDetail;
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";

const EvidenceDetail = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const evidence = data.find((doc) => doc.id === parseInt(id));

  const [versions, setVersions] = useState(evidence?.versions || []);
  const [showModal, setShowModal] = useState(false);

  // Modal form state
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  if (!evidence) return <div>Document not found</div>;

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
      size: file ? `${file.size / 1000} KB` : "N/A",
      expiry: expiry || "N/A",
    };

    setVersions([...versions, newVersion]);
    // reset modal fields
    setNotes("");
    setExpiry("");
    setFile(null);
    setError("");
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Metadata */}
      <div className="mb-6 border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-2">{evidence.docName}</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
            {evidence.docType}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              evidence.status === "Expiring Soon"
                ? "bg-red-500"
                : evidence.status === "Expired"
                ? "bg-gray-500"
                : "bg-green-500"
            }`}
          >
            {evidence.status}
          </span>
          <span>Expiry: {evidence.expiry}</span>
        </div>
      </div>

      {/* Versions Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Versions</h3>
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Version</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Uploader</th>
              <th className="py-2 px-4 text-left">Notes</th>
              <th className="py-2 px-4 text-left">File Size</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">v{i + 1}</td>
                <td className="py-2 px-4">{v.date}</td>
                <td className="py-2 px-4">{v.uploader}</td>
                <td className="py-2 px-4">{v.notes}</td>
                <td className="py-2 px-4">{v.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload New Version Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Upload New Version
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Upload New Version</h3>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleUpload} className="flex flex-col gap-3">
              <div>
                <label className="block mb-1">Notes <span className="text-red-500">*</span></label>
                <textarea
                  className="border w-full px-3 py-2 rounded"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="border w-full px-3 py-2 rounded"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">File (optional)</label>
                <input
                  type="file"
                  className="border w-full px-3 py-2 rounded"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

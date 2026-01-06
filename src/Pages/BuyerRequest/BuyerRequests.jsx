import React, { useState } from "react";

// Reusable StatusChip component
const StatusChip = ({ status }) => {
  let bg = "bg-gray-300";
  if (status === "Pending") bg = "bg-yellow-500 text-white";
  if (status === "Fulfilled") bg = "bg-green-500 text-white";
  if (status === "Expired") bg = "bg-red-500 text-white";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${bg}`}>
      {status}
    </span>
  );
};

const BuyerRequests = () => {
  // Mock Vault / Existing Evidence
  const [vault, setVault] = useState([
    { id: 1, docName: "Safety Procedures Manual", docType: "Manual" },
    { id: 2, docName: "Supplier Contract Agreement", docType: "Contract" },
    { id: 3, docName: "ISO Compliance Checklist", docType: "Checklist" }
  ]);

  // Mock Requests / To-Do items
  const [requests, setRequests] = useState([
    { id: 1, docType: "Manual", dueDate: "2026-01-10", status: "Pending" },
    { id: 2, docType: "Contract", dueDate: "2026-01-15", status: "Pending" },
    { id: 3, docType: "Report", dueDate: "2026-01-12", status: "Pending" }
  ]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState("");
  const [newEvidenceName, setNewEvidenceName] = useState("");
  const [error, setError] = useState("");

  // Open Modal
  const openModal = (request) => {
    setCurrentRequest(request);
    setSelectedEvidence("");
    setNewEvidenceName("");
    setError("");
    setShowModal(true);
  };

  // Fulfill Request
  const fulfillRequest = () => {
    // Validation: Must select existing OR create new
    if (!selectedEvidence && !newEvidenceName.trim()) {
      setError("Please select existing evidence or create new evidence");
      return;
    }

    // If creating new evidence, add to vault
    if (newEvidenceName.trim() && !selectedEvidence) {
      const newEvidence = {
        id: vault.length + 1,
        docName: newEvidenceName.trim(),
        docType: currentRequest.docType
      };
      setVault([...vault, newEvidence]);
    }

    // Mark request as fulfilled
    setRequests(requests.map(r => 
      r.id === currentRequest.id ? {...r, status: "Fulfilled"} : r
    ));
    
    setShowModal(false);
    setError("");
  };

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Buyer Request To-Do</h1>

      {/* Requests Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full border border-indigo-200 rounded-lg">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-indigo-800">Doc Type</th>
              <th className="py-3 px-4 text-left font-semibold text-indigo-800">Due Date</th>
              <th className="py-3 px-4 text-left font-semibold text-indigo-800">Status</th>
              <th className="py-3 px-4 text-left font-semibold text-indigo-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="border-b hover:bg-indigo-50 transition-colors">
                <td className="py-3 px-4 font-medium">{request.docType}</td>
                <td className="py-3 px-4">{new Date(request.dueDate).toLocaleDateString()}</td>
                <td className="py-3 px-4"><StatusChip status={request.status} /></td>
                <td className="py-3 px-4">
                  {request.status === "Pending" && (
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md transition-all font-medium"
                      onClick={() => openModal(request)}
                    >
                      Fulfill
                    </button>
                  )}
                  {request.status === "Fulfilled" && (
                    <span className="text-green-600 font-medium">✓ Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fulfill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-indigo-800">
              Fulfill Request: {currentRequest.docType}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Due Date: <span className="font-semibold">{new Date(currentRequest.dueDate).toLocaleDateString()}</span>
            </p>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Select Existing Evidence */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">
                Select Existing Evidence:
              </label>
              <select
                className="border border-indigo-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                value={selectedEvidence}
                onChange={(e) => {
                  setSelectedEvidence(e.target.value);
                  if (e.target.value) setNewEvidenceName(""); // Clear new evidence if selecting existing
                }}
              >
                <option value="">-- Select from Vault --</option>
                {vault.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.docName} ({v.docType})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 font-medium">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Or create new evidence */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">
                Create New Evidence:
              </label>
              <input
                type="text"
                placeholder="Enter new evidence name"
                className="border border-indigo-300 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                value={newEvidenceName}
                onChange={(e) => {
                  setNewEvidenceName(e.target.value);
                  if (e.target.value) setSelectedEvidence(""); // Clear selection if creating new
                }}
              />
              {newEvidenceName && (
                <p className="text-sm text-gray-600 mt-1">
                  Will create: <span className="font-semibold">{newEvidenceName}</span> ({currentRequest.docType})
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={fulfillRequest}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all font-medium"
              >
                Fulfill Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerRequests;
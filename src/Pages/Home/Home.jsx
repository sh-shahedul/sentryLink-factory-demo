// // import React, { useState, useMemo } from "react";
// // import { useLoaderData, useNavigate } from "react-router";

// // const Home = () => {
// //   const data = useLoaderData(); // expecting array of documents
// //   const [search, setSearch] = useState("");
// //   const [filterType, setFilterType] = useState("All");
// //   const [filterStatus, setFilterStatus] = useState("All");
// //   const [filterExpiry, setFilterExpiry] = useState("All");
// //   const [selectedDocs, setSelectedDocs] = useState([]);
// //   const navigate = useNavigate();

// //   // Filtered data
// //   const filteredData = useMemo(() => {
// //     return data.filter((doc) => {
// //       if (search && !doc.docName.toLowerCase().includes(search.toLowerCase()))
// //         return false;
// //       if (filterType !== "All" && doc.docType !== filterType) return false;
// //       if (filterStatus !== "All" && doc.status !== filterStatus) return false;

// //       const today = new Date();
// //       const expiryDate = new Date(doc.expiry);
// //       if (filterExpiry === "Expired" && expiryDate >= today) return false;
// //       if (filterExpiry === "Expiring Soon" && expiryDate < today) return false;

// //       return true;
// //     });
// //   }, [data, search, filterType, filterStatus, filterExpiry]);

// //   // Checkbox select
// //   const handleSelect = (id) => {
// //     setSelectedDocs((prev) =>
// //       prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
// //     );
// //   };

// //   const handleSelectAll = () => {
// //     if (selectedDocs.length === filteredData.length) {
// //       setSelectedDocs([]);
// //     } else {
// //       setSelectedDocs(filteredData.map((doc) => doc.id));
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Documents Table</h1>

// //       {/* Filters */}
// //       <div className="flex flex-wrap gap-4 mb-4">
// //         <input
// //           type="text"
// //           placeholder="Search by name..."
// //           className="border px-3 py-1 rounded"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <select
// //           className="border px-3 py-1 rounded"
// //           value={filterType}
// //           onChange={(e) => setFilterType(e.target.value)}
// //         >
// //           <option value="All">All Doc Types</option>
// //           {[...new Set(data.map((d) => d.docType))].map((type) => (
// //             <option key={type} value={type}>
// //               {type}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           className="border px-3 py-1 rounded"
// //           value={filterStatus}
// //           onChange={(e) => setFilterStatus(e.target.value)}
// //         >
// //           <option value="All">All Status</option>
// //           {[...new Set(data.map((d) => d.status))].map((status) => (
// //             <option key={status} value={status}>
// //               {status}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           className="border px-3 py-1 rounded"
// //           value={filterExpiry}
// //           onChange={(e) => setFilterExpiry(e.target.value)}
// //         >
// //           <option value="All">All Expiry</option>
// //           <option value="Expired">Expired</option>
// //           <option value="Expiring Soon">Expiring Soon</option>
// //         </select>
// //       </div>

// //       {/* Bulk Action */}
// //       {selectedDocs.length > 0 && (
// //         <div className="mb-2">
// //           <button className="bg-blue-500 text-white px-4 py-1 rounded">
// //             Add to Pack ({selectedDocs.length})
// //           </button>
// //         </div>
// //       )}

// //       {/* Table */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full border border-gray-200 rounded-lg">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="py-3 px-5">
// //                 <input
// //                   type="checkbox"
// //                   checked={
// //                     selectedDocs.length === filteredData.length &&
// //                     filteredData.length > 0
// //                   }
// //                   onChange={handleSelectAll}
// //                 />
// //               </th>
// //               <th className="py-3 px-5 text-left">Doc Name</th>
// //               <th className="py-3 px-5 text-left">Doc Type</th>
// //               <th className="py-3 px-5 text-left">Status</th>
// //               <th className="py-3 px-5 text-left">Expiry</th>
// //               <th className="py-3 px-5 text-left">Versions</th>
// //               <th className="py-3 px-5 text-left">Last Updated</th>
// //               <th className="py-3 px-5 text-center">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {filteredData.length === 0 && (
// //               <tr>
// //                 <td colSpan={8} className="text-center py-4">
// //                   No documents found.
// //                 </td>
// //               </tr>
// //             )}

// //             {filteredData.map((doc) => (
// //               <tr key={doc.id} className="border-b hover:bg-gray-50">
// //                 <td className="py-3 px-5">
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedDocs.includes(doc.id)}
// //                     onChange={() => handleSelect(doc.id)}
// //                   />
// //                 </td>
// //                 <td className="py-3 px-5">{doc.docName}</td>
// //                 <td className="py-3 px-5">{doc.docType}</td>
// //                 <td className="py-3 px-5">
// //                   <span
// //                     className={`px-2 py-1 rounded-full text-white text-sm ${
// //                       doc.status === "Expiring Soon"
// //                         ? "bg-red-500"
// //                         : doc.status === "Expired"
// //                         ? "bg-gray-500"
// //                         : "bg-green-500"
// //                     }`}
// //                   >
// //                     {doc.status}
// //                   </span>
// //                 </td>
// //                 <td className="py-3 px-5">{doc.expiry}</td>

// //                 {/* Versions column: show number of versions */}
// //                 <td className="py-3 px-5">
// //                   {doc.versions.length}{" "}
// //                   <button
// //                     onClick={() => navigate(`/evidence/${doc.id}`)}
// //                     className="ml-2 text-blue-500 underline text-sm"
// //                   >
// //                     View
// //                   </button>
// //                 </td>

// //                 <td className="py-3 px-5">{doc.lastUpdated}</td>

// //                 <td className="py-3 px-5 text-center flex gap-2 justify-center">
// //                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
// //                     Add to Pack
// //                   </button>
// //                   <button
// //                     onClick={() => navigate(`/evidence/${doc.id}`)}
// //                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
// //                   >
// //                     View
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useState, useMemo, useEffect } from "react";
// import { useLoaderData, useNavigate, useSearchParams } from "react-router";

// const Home = () => {
//   const data = useLoaderData(); 
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- Initialize state from URL ---
//   const [search, setSearch] = useState(searchParams.get("search") || "");
//   const [filterType, setFilterType] = useState(searchParams.get("type") || "All");
//   const [filterStatus, setFilterStatus] = useState(searchParams.get("status") || "All");
//   const [filterExpiry, setFilterExpiry] = useState(searchParams.get("expiry") || "All");
//   const [selectedDocs, setSelectedDocs] = useState([]);

//   // --- Persist filters to URL ---
//   useEffect(() => {
//     const params = {};
//     if (search) params.search = search;
//     if (filterType !== "All") params.type = filterType;
//     if (filterStatus !== "All") params.status = filterStatus;
//     if (filterExpiry !== "All") params.expiry = filterExpiry;
//     setSearchParams(params);
//   }, [search, filterType, filterStatus, filterExpiry, setSearchParams]);

//   // --- Filtered data ---
//   const filteredData = useMemo(() => {
//     return data.filter((doc) => {
//       if (search && !doc.docName.toLowerCase().includes(search.toLowerCase())) return false;
//       if (filterType !== "All" && doc.docType !== filterType) return false;
//       if (filterStatus !== "All" && doc.status !== filterStatus) return false;

//       const today = new Date();
//       const expiryDate = new Date(doc.expiry);
//       if (filterExpiry === "Expired" && expiryDate >= today) return false;
//       if (filterExpiry === "Expiring Soon" && expiryDate < today) return false;

//       return true;
//     });
//   }, [data, search, filterType, filterStatus, filterExpiry]);

//   // --- Checkbox select ---
//   const handleSelect = (id) => {
//     setSelectedDocs((prev) =>
//       prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedDocs.length === filteredData.length) {
//       setSelectedDocs([]);
//     } else {
//       setSelectedDocs(filteredData.map((doc) => doc.id));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Documents Table</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="border px-3 py-1 rounded"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="border px-3 py-1 rounded"
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//         >
//           <option value="All">All Doc Types</option>
//           {[...new Set(data.map((d) => d.docType))].map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>

//         <select
//           className="border px-3 py-1 rounded"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="All">All Status</option>
//           {[...new Set(data.map((d) => d.status))].map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>

//         <select
//           className="border px-3 py-1 rounded"
//           value={filterExpiry}
//           onChange={(e) => setFilterExpiry(e.target.value)}
//         >
//           <option value="All">All Expiry</option>
//           <option value="Expired">Expired</option>
//           <option value="Expiring Soon">Expiring Soon</option>
//         </select>
//       </div>

//       {/* Bulk Action */}
//       {selectedDocs.length > 0 && (
//         <div className="mb-2">
//           <button className="bg-blue-500 text-white px-4 py-1 rounded">
//             Add to Pack ({selectedDocs.length})
//           </button>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-5">
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedDocs.length === filteredData.length && filteredData.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th className="py-3 px-5 text-left">Doc Name</th>
//               <th className="py-3 px-5 text-left">Doc Type</th>
//               <th className="py-3 px-5 text-left">Status</th>
//               <th className="py-3 px-5 text-left">Expiry</th>
//               <th className="py-3 px-5 text-left">Versions</th>
//               <th className="py-3 px-5 text-left">Last Updated</th>
//               <th className="py-3 px-5 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredData.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center py-4">
//                   No documents found.
//                 </td>
//               </tr>
//             )}

//             {filteredData.map((doc) => (
//               <tr key={doc.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-5">
//                   <input
//                     type="checkbox"
//                     checked={selectedDocs.includes(doc.id)}
//                     onChange={() => handleSelect(doc.id)}
//                   />
//                 </td>
//                 <td className="py-3 px-5">{doc.docName}</td>
//                 <td className="py-3 px-5">{doc.docType}</td>
//                 <td className="py-3 px-5">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-sm ${
//                       doc.status === "Expiring Soon"
//                         ? "bg-red-500"
//                         : doc.status === "Expired"
//                         ? "bg-gray-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {doc.status}
//                   </span>
//                 </td>
//                 <td className="py-3 px-5">{doc.expiry}</td>
//                 <td className="py-3 px-5">
//                   {doc.versions.length}{" "}
//                   <button
//                     onClick={() => navigate(`/evidence/${doc.id}`)}
//                     className="ml-2 text-blue-500 underline text-sm"
//                   >
//                     View
//                   </button>
//                 </td>
//                 <td className="py-3 px-5">{doc.lastUpdated}</td>
//                 <td className="py-3 px-5 text-center flex gap-2 justify-center">
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
//                     Add to Pack
//                   </button>
//                   <button
//                     onClick={() => navigate(`/evidence/${doc.id}`)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

const Home = () => {
  const data = useLoaderData(); 
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Initialize state from URL ---
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [filterType, setFilterType] = useState(searchParams.get("type") || "All");
  const [filterStatus, setFilterStatus] = useState(searchParams.get("status") || "All");
  const [filterExpiry, setFilterExpiry] = useState(searchParams.get("expiry") || "All");
  const [selectedDocs, setSelectedDocs] = useState([]);

  // --- Persist filters to URL ---
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (filterType !== "All") params.type = filterType;
    if (filterStatus !== "All") params.status = filterStatus;
    if (filterExpiry !== "All") params.expiry = filterExpiry;
    setSearchParams(params);
  }, [search, filterType, filterStatus, filterExpiry, setSearchParams]);

  // --- Filtered data ---
  const filteredData = useMemo(() => {
    return data.filter((doc) => {
      if (search && !doc.docName.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterType !== "All" && doc.docType !== filterType) return false;
      if (filterStatus !== "All" && doc.status !== filterStatus) return false;

      const today = new Date();
      const expiryDate = new Date(doc.expiry);
      if (filterExpiry === "Expired" && expiryDate >= today) return false;
      if (filterExpiry === "Expiring Soon" && expiryDate < today) return false;

      return true;
    });
  }, [data, search, filterType, filterStatus, filterExpiry]);

  // --- Checkbox select ---
  const handleSelect = (id) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === filteredData.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredData.map((doc) => doc.id));
    }
  };

  // --- Add to Pack via row button ---
  const handleAddToPack = (id) => {
    handleSelect(id); // reuse checkbox logic
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Documents Table</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-indigo-300 px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-indigo-300 px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Doc Types</option>
          {[...new Set(data.map((d) => d.docType))].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="border border-indigo-300 px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          {[...new Set(data.map((d) => d.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className="border border-indigo-300 px-3 py-1 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
          value={filterExpiry}
          onChange={(e) => setFilterExpiry(e.target.value)}
        >
          <option value="All">All Expiry</option>
          <option value="Expired">Expired</option>
          <option value="Expiring Soon">Expiring Soon</option>
        </select>
      </div>

      {/* Bulk Action */}
      {selectedDocs.length > 0 && (
        <div className="mb-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all">
            Add to Pack ({selectedDocs.length})
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-indigo-200 rounded-lg">
          <thead className="bg-indigo-50">
            <tr>
              <th className="py-3 px-5">
                <input
                  type="checkbox"
                  checked={
                    selectedDocs.length === filteredData.length && filteredData.length > 0
                  }
                  onChange={handleSelectAll}
                  className="accent-indigo-600"
                />
              </th>
              <th className="py-3 px-5 text-left">Doc Name</th>
              <th className="py-3 px-5 text-left">Doc Type</th>
              <th className="py-3 px-5 text-left">Status</th>
              <th className="py-3 px-5 text-left">Expiry</th>
              <th className="py-3 px-5 text-left">Versions</th>
              <th className="py-3 px-5 text-left">Last Updated</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-indigo-600 font-medium">
                  No documents found.
                </td>
              </tr>
            )}

            {filteredData.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-indigo-50">
                <td className="py-3 px-5">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => handleSelect(doc.id)}
                    className="accent-indigo-600"
                  />
                </td>
                <td className="py-3 px-5 font-medium text-indigo-700">{doc.docName}</td>
                <td className="py-3 px-5">{doc.docType}</td>
                <td className="py-3 px-5">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      doc.status === "Expiring Soon"
                        ? "bg-orange-500"
                        : doc.status === "Expired"
                        ? "bg-gray-500"
                        : "bg-green-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="py-3 px-5">{doc.expiry}</td>
                <td className="py-3 px-5">
                  {doc.versions.length}{" "}
                 
                </td>
                <td className="py-3 px-5">{doc.lastUpdated}</td>
                <td className="py-3 px-5 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleAddToPack(doc.id)}
                    className={`px-4 py-1 rounded-lg text-white transition-all ${
                      selectedDocs.includes(doc.id)
                        ? "bg-indigo-800 hover:bg-indigo-900"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {selectedDocs.includes(doc.id) ? "Added" : "Add to Pack"}
                  </button>
                  <button
                    onClick={() => navigate(`/evidence/${doc.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

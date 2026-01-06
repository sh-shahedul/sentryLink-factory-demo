// import React from "react";
// import { FaUserCircle } from "react-icons/fa";

// const Header = () => {
//   return (
//     <div className="navbar bg-white shadow-sm px-4 md:px-8">
//       {/* Navbar Start: Logo + Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           {/* Mobile Hamburger */}
//           <label tabIndex={0} className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </label>

//           {/* Mobile Menu Items */}
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
//           >
//             <li>
//               <a href="/">Evidence Vault</a>
//             </li>
//             <li>
//               <a href="/requests">Buyer Requests</a>
//             </li>
//             <li>
//               <a href="/about">About</a>
//             </li>
//           </ul>
//         </div>

//         {/* Logo */}
//         <a className="btn btn-ghost text-2xl font-bold text-blue-600">
//           SentryLink
//         </a>
//       </div>

//       {/* Navbar Center: Desktop Menu */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <a href="/">Evidence Vault</a>
//           </li>
//           <li>
//             <details>
//               <summary>Buyer Requests</summary>
//               <ul className="p-2 bg-white w-40 shadow rounded-box">
//                 <li>
//                   <a href="/requests">All Requests</a>
//                 </li>
//                 <li>
//                   <a href="/requests/new">New Request</a>
//                 </li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <a href="/about">About</a>
//           </li>
//         </ul>
//       </div>

//       {/* Navbar End: User/Profile */}
//       <div className="navbar-end">
//         <FaUserCircle className="text-2xl text-gray-700 cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { HiHome, HiDocumentText, HiInbox } from "react-icons/hi";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-8 sticky top-0 z-50">
      {/* Navbar Start: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Mobile Hamburger */}
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          {/* Mobile Menu Items */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 z-50"
          >
            <li>
              <Link to="/" className={isActive("/") ? "active" : ""}>
                <HiDocumentText className="w-5 h-5" />
                Evidence Vault
              </Link>
            </li>
            <li>
              <Link to="/requests" className={isActive("/requests") ? "active" : ""}>
                <HiInbox className="w-5 h-5" />
                Buyer Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-bold text-blue-600 gap-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
            <HiHome className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-start">
            <span>SentryLink</span>
            <span className="text-xs font-normal text-gray-500">Comply Phase A</span>
          </div>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-2 ${isActive("/") ? "bg-blue-50 text-blue-700 font-medium" : ""}`}
            >
              <HiDocumentText className="w-5 h-5" />
              Evidence Vault
            </Link>
          </li>
          <li>
            <Link 
              to="/requests" 
              className={`flex items-center gap-2 ${isActive("/requests") ? "bg-blue-50 text-blue-700 font-medium" : ""}`}
            >
              <HiInbox className="w-5 h-5" />
              Buyer Requests
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End: Notifications + User Profile */}
      <div className="navbar-end gap-2">
        {/* Notification Bell */}
        <div className="indicator">
          <span className="indicator-item badge badge-xs badge-error"></span>
          <button className="btn btn-ghost btn-circle">
            <FaBell className="text-xl text-gray-700" />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FaUserCircle className="text-2xl text-white" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 z-50"
          >
            <li className="menu-title">
              <span className="text-sm font-medium">Factory User</span>
              <span className="text-xs text-gray-500">Admin</span>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
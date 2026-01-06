
import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { HiHome, HiDocumentText, HiInbox } from "react-icons/hi";
import { Link, useLocation } from "react-router";
import logo from "../../assets/senetryllogo.png"
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
              <Link to="/request" className={isActive("/request") ? "active" : ""}>
                <HiInbox className="w-5 h-5" />
                Buyer Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
         <img src={logo} alt="" />
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-1 ${isActive("/") ? "bg-blue-50 text-blue-700 font-bold" : "font-bold"}`}
            >
              <HiDocumentText size={22} />
              Evidence Vault
            </Link>
          </li>
          <li>
            <Link 
              to="/request" 
              className={`flex items-center gap-2 ${isActive("/request") ? "bg-blue-50 text-blue-700 font-bold" : "font-bold"}`}
            >
              <HiInbox size={22}/>
              Buyer Requests
            </Link>
          </li>
        </ul>
      </div>


      <div className="navbar-end ">
     

        {/* User Profile  */}
       
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FaUserCircle className="text-2xl text-white" />
            </div>
          </label>
    
      </div>
    </div>
  );
};

export default Header;
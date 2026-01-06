import React from "react";
import logo from "../../assets/senetryllogo.png"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
  <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white">SenetryLink</h2>
          <p className="mt-3 text-sm text-gray-400">
            Securely manage, track and organize your important documents
            in one place.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Documents</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">Email: support@docvault.com</p>
          <p className="text-sm mt-1">Phone: +880 1234 567890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition"><FaFacebook /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram/></a>
            <a href="#" className="hover:text-white transition"><FaLinkedin/></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SenetryLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

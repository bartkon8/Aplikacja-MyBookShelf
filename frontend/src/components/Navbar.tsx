import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { FaBookOpen } from 'react-icons/fa';

const Navbar: React.FC = () => {

  const { isAuthenticated, isAuthChecked, logout } = useAuth();

  const navigate = useNavigate();
  if (!isAuthChecked) return null;

  console.log("[Navbar] isAuthenticated:", isAuthenticated);
  console.log("[Navbar] isAuthChecked:", isAuthChecked);

  const handleLogout = () => {
    console.log("[Navbar] Logout clicked");
    logout();
    navigate("/");
  };

  if (!isAuthChecked) {
    console.log("[Navbar] Waiting for auth check");
    return null;
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition">
          <FaBookOpen size={28} color="#16a34a" />
          <span className="text-2xl font-semibold">My Bookshelf</span>
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/search"
              className="text-gray-700 hover:text-green-600 transition font-medium text-lg"
            >
              Wyszukiwarka
            </Link>
            <Link
              to="/myshelf"
              className="text-gray-700 hover:text-green-600 transition font-medium text-lg"
            >
              Moja półka
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 transition font-medium text-lg"
            >
              Logowanie
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-green-600 transition font-medium text-lg"
            >
              Rejestracja
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm"
          >
            Wyloguj
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBus, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Icons for a better UI

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status whenever the route changes
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Left Side: Logo/Branding */}
      <div className="flex items-center gap-2">
        <FaBus className="text-blue-600 text-2xl" />
        <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
          Jet<span className="text-blue-600">Bus</span>
        </Link>
      </div>

      {/* Center: Main Links */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <Link title="Home" to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link title="Search Buses" to="/search" className="hover:text-blue-600 transition-colors">Buses</Link>
        <Link title="About Us" to="/about" className="hover:text-blue-600 transition-colors">About</Link>
        <Link title="Contact" to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        <Link title="Help" to="/services" className="hover:text-blue-600 transition-colors">Help</Link>
      </div>

      {/* Right Side: Dashboard & Auth */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link 
              title="Dashboard" 
              to="/admin/dashboard" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <FaUserCircle /> Dashboard
            </Link>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all font-medium text-sm"
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <Link 
            title="Login" 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
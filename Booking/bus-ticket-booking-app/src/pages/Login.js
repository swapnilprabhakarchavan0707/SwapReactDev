import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserShield, FaLock, FaEnvelope, FaBus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API endpoint remains the same as per your backend structure
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);
      
      if (response.data.success) {
        toast.success("Welcome back to JetBus!");
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        
        setTimeout(() => navigate('/admin/dashboard'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed. Access Denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        {/* Top Decorative Banner - JetBus Branded */}
        <div className="bg-indigo-700 p-8 text-center text-white relative overflow-hidden">
          {/* Subtle Background Icon for design */}
          <FaBus className="absolute -right-4 -bottom-4 text-8xl text-indigo-600 opacity-20 rotate-12" />
          
          <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-4">
            <FaUserShield size={36} className="text-indigo-100" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter">JetBus Admin</h2>
          <p className="text-indigo-200 text-sm font-medium mt-1">Fleet Management & Security Portal</p>
        </div>

        {/* Form Section */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Admin Email</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 focus:outline-none transition-all"
                  placeholder="admin@jetbus.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-white transition-all transform active:scale-95 shadow-lg ${
                loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Verifying...
                </span>
              ) : "Authorize Access"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="h-px bg-slate-100 w-full mb-6"></div>
            <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
              Secure Terminal <br />
              Encryption Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
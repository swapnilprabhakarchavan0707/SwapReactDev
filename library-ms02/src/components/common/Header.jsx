import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header = () => {
  const { currentUser, setCurrentUser, activeTab, sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="text-gray-600 hover:text-gray-800"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
        </div>
        <button
          onClick={() => setCurrentUser(null)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
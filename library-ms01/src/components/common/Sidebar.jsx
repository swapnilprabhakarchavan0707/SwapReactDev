import React from 'react';
import { BookOpen, Book, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { currentUser, activeTab, setActiveTab, sidebarOpen } = useAppContext();

  const adminMenuItems = [
    { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
    { id: 'books', icon: Book, label: 'Books Management' },
    { id: 'users', icon: Users, label: 'Users Management' },
    { id: 'loans', icon: BookOpen, label: 'Loan Management' },
  ];

  const customerMenuItems = [
    { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
    { id: 'browse', icon: Book, label: 'Browse Books' },
    { id: 'myloans', icon: BookOpen, label: 'My Loans' },
  ];

  const menuItems = currentUser?.role === 'admin' ? adminMenuItems : customerMenuItems;

  return (
    <div className={`bg-indigo-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden z-40`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen size={32} />
            <span className="text-xl font-bold">Library</span>
          </div>
        </div>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id ? 'bg-indigo-700' : 'hover:bg-indigo-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
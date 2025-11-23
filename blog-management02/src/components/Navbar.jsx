import React from 'react';
import { BookOpen, Plus, Home, FolderPlus, LogOut } from 'lucide-react';

const Navbar = ({ currentUser, view, setView, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
    setView('login'); // Reset to login page
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">BlogHub</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('home')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${view === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Home size={18} />
              <span className="font-medium">Home</span>
            </button>
            <button 
              onClick={() => setView('myBlogs')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${view === 'myBlogs' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen size={18} />
              <span className="font-medium">My Blogs</span>
            </button>
            <button 
              onClick={() => setView('addBlog')} 
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              <span className="font-medium">New Blog</span>
            </button>
            <button 
              onClick={() => setView('categories')} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${view === 'categories' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FolderPlus size={18} />
              <span className="font-medium">Categories</span>
            </button>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
              <span className="text-gray-700 font-medium">{currentUser.name}</span>
              <button 
                onClick={handleLogout} 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
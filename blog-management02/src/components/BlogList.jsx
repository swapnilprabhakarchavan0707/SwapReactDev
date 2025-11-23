import React, { useState } from 'react';
import { Search, Edit2, Trash2, User, BookOpen } from 'lucide-react';

const BlogList = ({ currentUser, blogs, setBlogs, users, categories, setEditingBlog, setView, userOnly = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = !userOnly || blog.userId === currentUser.id;
    return matchesSearch && matchesUser;
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this blog?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {userOnly ? 'My Blogs' : 'All Blogs'}
        </h2>
        {!userOnly && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs by title..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map(blog => {
          const author = users.find(u => u.id === blog.userId);
          // Convert both to numbers for comparison
          const category = categories.find(c => Number(c.id) === Number(blog.categoryId));
          const isOwner = blog.userId === currentUser.id;
          
          return (
            <div key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {category?.name || 'Uncategorized'}
                  </span>
                  {isOwner && (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => { setEditingBlog(blog); setView('addBlog'); }} 
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)} 
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {author?.name || 'Unknown'}
                  </span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No blogs found</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
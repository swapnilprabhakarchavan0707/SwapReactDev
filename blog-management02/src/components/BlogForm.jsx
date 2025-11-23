import React, { useState } from 'react';

const BlogForm = ({ currentUser, editingBlog, setEditingBlog, blogs, setBlogs, categories, setView }) => {
  const [formData, setFormData] = useState(editingBlog || { title: '', content: '', categoryId: '' });

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.categoryId) {
      alert('All fields are required');
      return;
    }
    
    // Convert categoryId to number for consistent comparison
    const blogData = {
      ...formData,
      categoryId: Number(formData.categoryId)
    };
    
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { 
        ...blogData, 
        id: editingBlog.id, 
        userId: editingBlog.userId, 
        createdAt: editingBlog.createdAt 
      } : b));
      setEditingBlog(null);
    } else {
      setBlogs([...blogs, { 
        ...blogData, 
        id: Date.now(), 
        userId: currentUser.id, 
        createdAt: new Date().toISOString() 
      }]);
    }
    setView('home');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {editingBlog ? 'Edit Blog' : 'Create New Blog'}
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Write your blog content..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-64"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <div className="flex gap-4">
          <button 
            onClick={handleSubmit} 
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {editingBlog ? 'Update Blog' : 'Publish Blog'}
          </button>
          <button 
            onClick={() => { setEditingBlog(null); setView('home'); }} 
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
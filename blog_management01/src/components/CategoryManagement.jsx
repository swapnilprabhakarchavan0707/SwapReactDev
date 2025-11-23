import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const CategoryManagement = ({ categories, setCategories }) => {
  const [formData, setFormData] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSubmit = () => {
    if (!formData.name) {
      alert('Category name is required');
      return;
    }
    
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...formData, id: editingCategory.id } : c));
      setEditingCategory(null);
    } else {
      setCategories([...categories, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData(category);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({ name: '' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Categories</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Category Name"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
        />
        <button 
          onClick={handleSubmit} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          {editingCategory ? 'Update' : 'Add'}
        </button>
        {editingCategory && (
          <button 
            onClick={handleCancel} 
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">{cat.name}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(cat)} 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(cat.id)} 
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
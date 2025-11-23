import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import CategoryManagement from './components/CategoryManagement';
import { storage } from './utils/storage';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());
  const [view, setView] = useState('login'); // Changed from 'home' to 'login'
  const [users, setUsers] = useState(storage.getUsers());
  const [blogs, setBlogs] = useState(storage.getBlogs());
  const [categories, setCategories] = useState(storage.getCategories());
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    storage.setUsers(users);
  }, [users]);

  useEffect(() => {
    storage.setBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    storage.setCategories(categories);
  }, [categories]);

  useEffect(() => {
    storage.setCurrentUser(currentUser);
  }, [currentUser]);

  // Reset view to 'home' when user logs in
  useEffect(() => {
    if (currentUser) {
      setView('home');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <AuthForm 
        isLogin={view === 'login'}
        users={users}
        setUsers={setUsers}
        setCurrentUser={setCurrentUser}
        setView={setView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentUser={currentUser}
        view={view}
        setView={setView}
        setCurrentUser={setCurrentUser}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && (
          <BlogList 
            currentUser={currentUser}
            blogs={blogs}
            setBlogs={setBlogs}
            users={users}
            categories={categories}
            setEditingBlog={setEditingBlog}
            setView={setView}
            userOnly={false}
          />
        )}
        {view === 'myBlogs' && (
          <BlogList 
            currentUser={currentUser}
            blogs={blogs}
            setBlogs={setBlogs}
            users={users}
            categories={categories}
            setEditingBlog={setEditingBlog}
            setView={setView}
            userOnly={true}
          />
        )}
        {view === 'addBlog' && (
          <BlogForm 
            currentUser={currentUser}
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
            blogs={blogs}
            setBlogs={setBlogs}
            categories={categories}
            setView={setView}
          />
        )}
        {view === 'categories' && (
          <CategoryManagement 
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
}

export default App;
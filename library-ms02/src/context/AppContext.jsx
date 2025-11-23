import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialBooks, initialUsers, initialLoans } from '../data/initialData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize state with data from localStorage or initial data
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem('library_books');
      return saved ? JSON.parse(saved) : initialBooks;
    } catch (error) {
      console.error('Error loading books:', error);
      return initialBooks;
    }
  });
  
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('library_users');
      const loadedUsers = saved ? JSON.parse(saved) : initialUsers;
      console.log('Loaded users:', loadedUsers);
      return loadedUsers;
    } catch (error) {
      console.error('Error loading users:', error);
      return initialUsers;
    }
  });
  
  const [loans, setLoans] = useState(() => {
    try {
      const saved = localStorage.getItem('library_loans');
      return saved ? JSON.parse(saved) : initialLoans;
    } catch (error) {
      console.error('Error loading loans:', error);
      return initialLoans;
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('library_books', JSON.stringify(books));
    } catch (error) {
      console.error('Error saving books:', error);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('library_users', JSON.stringify(users));
      console.log('Saved users to localStorage:', users);
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('library_loans', JSON.stringify(loans));
    } catch (error) {
      console.error('Error saving loans:', error);
    }
  }, [loans]);

  const value = {
    currentUser,
    setCurrentUser,
    activeTab,
    setActiveTab,
    books,
    setBooks,
    users,
    setUsers,
    loans,
    setLoans,
    searchTerm,
    setSearchTerm,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
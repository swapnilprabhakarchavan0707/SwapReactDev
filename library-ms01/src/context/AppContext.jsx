import React, { createContext, useContext, useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState(initialBooks);
  const [users, setUsers] = useState(initialUsers);
  const [loans, setLoans] = useState(initialLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
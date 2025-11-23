import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import BooksManagement from './components/admin/BooksManagement';
import UsersManagement from './components/admin/UsersManagement';
import LoanManagement from './components/admin/LoanManagement';
import CustomerDashboard from './components/customer/CustomerDashboard';
import BrowseBooks from './components/customer/BrowseBooks';
import MyLoans from './components/customer/MyLoans';
import './App.css';

const MainApp = () => {
  const { currentUser, activeTab, sidebarOpen } = useAppContext();

  const renderContent = () => {
    if (currentUser?.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'books':
          return <BooksManagement />;
        case 'users':
          return <UsersManagement />;
        case 'loans':
          return <LoanManagement />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <CustomerDashboard />;
        case 'browse':
          return <BrowseBooks />;
        case 'myloans':
          return <MyLoans />;
        default:
          return <CustomerDashboard />;
      }
    }
  };

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
import React from 'react';
import { Book, Users, BookOpen, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { books, users, loans } = useAppContext();

  const totalBooks = books.reduce((sum, book) => sum + book.total, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const totalUsers = users.filter(u => u.role === 'customer').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium opacity-90">Total Books</h3>
            <Book className="opacity-80" size={24} />
          </div>
          <p className="text-4xl font-bold">{totalBooks}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium opacity-90">Available</h3>
            <CheckCircle className="opacity-80" size={24} />
          </div>
          <p className="text-4xl font-bold">{availableBooks}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium opacity-90">Active Loans</h3>
            <BookOpen className="opacity-80" size={24} />
          </div>
          <p className="text-4xl font-bold">{activeLoans}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium opacity-90">Total Users</h3>
            <Users className="opacity-80" size={24} />
          </div>
          <p className="text-4xl font-bold">{totalUsers}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Loans</h3>
        <div className="space-y-3">
          {loans.slice(0, 5).map(loan => (
            <div key={loan.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{loan.bookTitle}</p>
                <p className="text-sm text-gray-600">{loan.userName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Due: {loan.dueDate}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{loan.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
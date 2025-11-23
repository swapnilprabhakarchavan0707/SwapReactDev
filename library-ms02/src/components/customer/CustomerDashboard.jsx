import React from 'react';
import { useAppContext } from '../../context/AppContext';

const CustomerDashboard = () => {
  const { currentUser, loans, books } = useAppContext();
  const myLoans = loans.filter(l => l.userId === currentUser.id && l.status === 'active');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium opacity-90 mb-4">Active Loans</h3>
          <p className="text-4xl font-bold">{myLoans.length}</p>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium opacity-90 mb-4">Available Books</h3>
          <p className="text-4xl font-bold">{books.filter(b => b.available > 0).length}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium opacity-90 mb-4">Member Since</h3>
          <p className="text-xl font-bold">{currentUser?.memberSince}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">My Current Loans</h3>
        {myLoans.length === 0 ? (
          <p className="text-gray-600">No active loans. Browse books to borrow!</p>
        ) : (
          <div className="space-y-3">
            {myLoans.map(loan => (
              <div key={loan.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{loan.bookTitle}</p>
                  <p className="text-sm text-gray-600">Loan Date: {loan.loanDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Due: {loan.dueDate}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
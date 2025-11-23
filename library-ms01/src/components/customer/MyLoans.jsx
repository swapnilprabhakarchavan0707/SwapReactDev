import React from 'react';
import { useAppContext } from '../../context/AppContext';

const MyLoans = () => {
  const { currentUser, loans } = useAppContext();
  const myLoans = loans.filter(l => l.userId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">All My Loans</h3>
        {myLoans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No loans found</p>
            <p className="text-gray-500 text-sm mt-2">Browse books to start borrowing!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myLoans.map(loan => (
              <div key={loan.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-lg">{loan.bookTitle}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Loan Date:</span> {loan.loanDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Due Date:</span> {loan.dueDate}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    loan.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLoans;
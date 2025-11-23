import React from 'react';
import { useAppContext } from '../../context/AppContext';

const LoanManagement = () => {
  const { loans, setLoans, books, setBooks } = useAppContext();

  const handleReturnBook = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      setLoans(loans.map(l => l.id === loanId ? {...l, status: 'returned'} : l));
      setBooks(books.map(b => b.id === loan.bookId ? {...b, available: b.available + 1} : b));
      alert('Book returned successfully!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Book</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loan Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loans.map(loan => (
            <tr key={loan.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{loan.bookTitle}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{loan.userName}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{loan.loanDate}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{loan.dueDate}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loan.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {loan.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {loan.status === 'active' && (
                  <button
                    onClick={() => handleReturnBook(loan.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Mark Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanManagement;
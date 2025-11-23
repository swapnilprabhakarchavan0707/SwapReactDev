import React from 'react';
import { Search, Book } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const BrowseBooks = () => {
  const { books, setBooks, loans, setLoans, currentUser, searchTerm, setSearchTerm } = useAppContext();

  const handleBorrowBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book && book.available > 0) {
      const newLoan = {
        id: loans.length + 1,
        bookId: book.id,
        userId: currentUser.id,
        bookTitle: book.title,
        userName: currentUser.name,
        loanDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active'
      };
      setLoans([...loans, newLoan]);
      setBooks(books.map(b => b.id === bookId ? {...b, available: b.available - 1} : b));
      alert('Book borrowed successfully! Due date: ' + newLoan.dueDate);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search books by title, author or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Book className="text-indigo-600" size={24} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {book.available > 0 ? 'Available' : 'Not Available'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
            <p className="text-xs text-gray-500 mb-1">ISBN: {book.isbn}</p>
            <p className="text-xs text-indigo-600 font-medium mb-4">{book.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{book.available}/{book.total} copies</span>
              <button
                onClick={() => handleBorrowBook(book.id)}
                disabled={book.available === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  book.available > 0
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
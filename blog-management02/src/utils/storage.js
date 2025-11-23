// Storage utility for managing localStorage
export const storage = {
  getUsers: () => JSON.parse(localStorage.getItem('users') || '[]'),
  getBlogs: () => JSON.parse(localStorage.getItem('blogs') || '[]'),
  getCategories: () => JSON.parse(localStorage.getItem('categories') || '[]'),
  getCurrentUser: () => JSON.parse(localStorage.getItem('currentUser') || 'null'),
  
  setUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),
  setBlogs: (blogs) => localStorage.setItem('blogs', JSON.stringify(blogs)),
  setCategories: (categories) => localStorage.setItem('categories', JSON.stringify(categories)),
  setCurrentUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),
  
  clearAll: () => {
    localStorage.removeItem('users');
    localStorage.removeItem('blogs');
    localStorage.removeItem('categories');
    localStorage.removeItem('currentUser');
  }
};
import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { users, setUsers, setCurrentUser, setActiveTab } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    console.log('Attempting login with:', email, password);
    console.log('Available users:', users);

    // Trim whitespace and convert to lowercase for comparison
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = users.find(u => 
      u.email.toLowerCase() === normalizedEmail && 
      u.password === normalizedPassword
    );
    
    console.log('Found user:', user);
    
    if (user) {
      setCurrentUser(user);
      setActiveTab('dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials and try again.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setError('Email already registered. Please login instead.');
      return;
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name: name,
      email: email.toLowerCase(),
      password: password,
      role: 'customer',
      memberSince: new Date().toISOString().split('T')[0],
      activeLoans: 0
    };

    setUsers([...users, newUser]);
    alert('Registration successful! Please login with your credentials.');
    
    // Clear form and switch to login
    setName('');
    setEmail('');
    setPassword('');
    setIsLogin(true);
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Library System</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue' : 'Create a new account'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-3">Demo Accounts (Click to use):</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@library.com', 'admin123')}
                className="w-full text-left p-2 bg-white rounded hover:bg-blue-100 transition"
              >
                <p className="text-xs text-gray-600">
                  <span className="font-medium text-indigo-600">Admin:</span> admin@library.com
                </p>
                <p className="text-xs text-gray-500">Password: admin123</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('rajesh@example.com', 'rajesh123')}
                className="w-full text-left p-2 bg-white rounded hover:bg-blue-100 transition"
              >
                <p className="text-xs text-gray-600">
                  <span className="font-medium text-indigo-600">Customer:</span> rajesh@example.com
                </p>
                <p className="text-xs text-gray-500">Password: rajesh123</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './pages/ProductPage'; // Acts as the Booking Center
import ProductCategory from './pages/ProductCategory'; // Acts as Fleet Category viewer
import Buses from './pages/Buses'; // The "All Fleets" / Search page
import BankAndFinance from './pages/Bank';

// Protected Route Component for Admin Security
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    // If no token exists, redirect to login while saving the attempted location
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      {/* Permanent Navigation Component */}
      <Navbar />
      
      {/* Global Toast Notifications Config */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Main Content Area with smooth transition wrapper */}
      <div className="content page-fade-in">
        <Routes>
          {/* --- Public JetBus Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          
          {/* Search/All Fleets: 
            Matches the 'Search' button in Navbar.js 
          */}
          <Route path="/search" element={<Buses />} />
          
          {/* Booking Center: 
            This matches navigate('/products') from ProductCategory.js
          */}
          <Route path="/products" element={<ProductPage />} />
          
          {/* Direct booking path alias for SEO/UX */}
          <Route path="/book-ticket" element={<ProductPage />} />
          
          {/* Fleet Category Viewer: 
            Dynamic route for /fleet/Sleeper, /fleet/Luxury, etc. 
          */}
          <Route path="/fleet/:categoryName" element={<ProductCategory />} />

          {/* --- Protected Admin Routes --- */}
          {/* Admin Main Control Panel */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Bank/UPI Management for Payments */}
          <Route 
            path="/admin/finance" 
            element={
              <ProtectedRoute>
                <BankAndFinance />
              </ProtectedRoute>
            } 
          />

          {/* --- Fallback Navigation --- */}
          {/* Catch-all: Redirects unknown URLs back to Home to prevent 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
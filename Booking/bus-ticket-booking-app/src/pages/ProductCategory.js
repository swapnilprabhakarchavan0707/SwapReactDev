import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBusesByType as fetchProductsByType } from '../api';
import { FaBus, FaArrowLeft } from 'react-icons/fa';

const ProductCategory = () => {
  const { categoryName } = useParams(); 
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const toSentenceCase = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchCategoryBuses = async () => {
      setLoading(true);
      try {
        const res = await fetchProductsByType(categoryName);
        setBuses(res.data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBuses();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-600 font-medium">Scanning {toSentenceCase(categoryName)} Fleet...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-slate-50 min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 font-bold transition-all group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Terminal
      </button>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 border-b-4 border-indigo-500 pb-2 inline-block uppercase tracking-tighter">
          {categoryName} Fleet
        </h2>
        <p className="text-slate-500 mt-4 font-medium uppercase text-xs tracking-[0.2em]">Premium {toSentenceCase(categoryName)} Logistics</p>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {buses && buses.length > 0 ? (
          buses.map((bus) => (
            <div 
              key={bus.id} 
              className="bg-white rounded-[2rem] shadow-sm overflow-hidden hover:shadow-2xl transition duration-500 border border-slate-100 flex flex-col h-full group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={`http://localhost:5000/uploads/${bus.product_image}`} 
                  alt={bus.product_name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  onError={(e) => { 
                    e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500'; 
                  }}
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Fast Route
                </div>
              </div>

              <div className="p-6 text-center flex flex-col flex-grow">
                <h3 className="text-xl font-black mb-2 text-slate-800 uppercase tracking-tight">{bus.product_name}</h3>
                
                {/* Meta details if available in your bus object */}
                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-4 font-bold uppercase">
                  <span>{toSentenceCase(categoryName)}</span>
                  <span>•</span>
                  <span>Premium Service</span>
                </div>

                <p className="text-indigo-600 font-black text-2xl mb-6 mt-auto">
                  ₹{bus.product_price}
                </p>
                
                {/* Check Availability Logic - Redirects to main products with category filter state */}
                <button 
                  onClick={() => navigate('/products', { state: { selectedCategory: categoryName } })} 
                  className="w-full bg-slate-900 text-white px-6 py-4 rounded-2xl hover:bg-indigo-600 transition-all font-black uppercase text-sm shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <FaBus className="text-xs" /> Check Availability
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
             <FaBus className="text-6xl mx-auto mb-4 text-slate-100" />
             <h3 className="text-2xl font-bold text-slate-700">No {toSentenceCase(categoryName)} Buses Scheduled</h3>
             <p className="text-slate-400 mt-2 font-medium">Please check our other premium fleets or contact support.</p>
          </div>
        )}
      </div>

      {/* Simple Category Footer Info */}
      <div className="mt-20 border-t border-slate-200 pt-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">JetBus Fleet Management • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default ProductCategory;
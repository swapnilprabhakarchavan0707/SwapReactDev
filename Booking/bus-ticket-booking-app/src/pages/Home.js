import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaBus, 
  FaShieldAlt, 
  FaWifi, 
  FaCouch, 
  FaRoute, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[650px] flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1470&auto=format&fit=crop')` 
        }}
      >
        <div className="text-center text-white px-4">
          <div className="flex justify-center mb-4">
            <span className="bg-indigo-600/30 backdrop-blur-md border border-indigo-400 text-indigo-100 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              India's #1 Premium Network
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
            Travel With <span className="text-indigo-400">JetBus</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Premium interiors, lightning-fast routes, and world-class safety. 
            Experience the future of intercity travel.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/search" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-black transition-all transform hover:scale-105 shadow-xl shadow-indigo-900/40 flex items-center gap-2">
              Book Your Ride <FaArrowRight />
            </Link>
            <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black transition-all border border-white/30">
              Our Fleet
            </Link>
          </div>
        </div>
      </div>

      {/* NEW: Attractive "Why Choose Us" Content Section */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3 mb-4">
            <FaBus className="text-indigo-600" /> The JetBus Experience
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium italic">
            "More than just a journey—we deliver comfort that moves you."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaShieldAlt className="text-2xl text-indigo-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Safety First</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              GPS tracked fleet with secondary drivers and 24/7 surveillance for your peace of mind.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaCouch className="text-2xl text-indigo-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Elite Comfort</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Ergonomic calf-rests, extra legroom, and premium 180° reclinable sleeper berths.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaWifi className="text-2xl text-indigo-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Stay Connected</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              High-speed 5G Wi-Fi and individual USB charging ports at every single seat.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaRoute className="text-2xl text-indigo-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase tracking-tight">Express Routes</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Zero-stop policies on major highways to get you to your destination 20% faster.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">READY TO EXPERIENCE THE DIFFERENCE?</h3>
                <p className="text-indigo-200 text-lg mb-10 font-medium">Join over 1 Million happy travelers across India.</p>
                <Link to="/search" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-2xl font-black hover:bg-indigo-400 hover:text-white transition-all shadow-2xl">
                    RESERVE YOUR SEAT <FaArrowRight />
                </Link>
            </div>
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter mb-6 italic">JET<span className="text-indigo-500">BUS</span></h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Redefining road travel across India with luxury, punctuality, and safety as our core pillars.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-indigo-400">Quick Links</h4>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li><Link to="/search" className="hover:text-white transition-colors">Search Buses</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-indigo-400">Top Routes</h4>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li className="hover:text-white cursor-pointer">Mumbai to Pune</li>
              <li className="hover:text-white cursor-pointer">Bangalore to Chennai</li>
              <li className="hover:text-white cursor-pointer">Delhi to Jaipur</li>
              <li className="hover:text-white cursor-pointer">Hyderabad to Goa</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-6 text-indigo-400">Follow Our Journey</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 transition-all"><FaFacebook /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 transition-all"><FaTwitter /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 transition-all"><FaInstagram /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 transition-all"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
          <p>© 2026 JETBUS PREMIUM TRAVELS PVT LTD.</p>
          <div className="flex gap-8">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
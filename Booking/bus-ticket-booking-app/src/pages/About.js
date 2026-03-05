import React from 'react';
import { 
  FaBus, 
  FaShieldAlt, 
  FaClock, 
  FaAward, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section with Animated Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 px-6 text-center text-white">
        {/* Subtle Background Pattern (CSS Only) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-6xl font-black mb-4 tracking-tight">Our Story</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light">
            Building the future of smart mobility for a more connected world.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-6">
        {/* Main Content & Stats Block */}
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          
          <div className="lg:col-span-3">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Welcome to <span className="text-blue-600">JetBus</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded in 2026, <span className="text-blue-600 font-semibold">JetBus</span> was born out of a simple vision: 
                to make intercity travel as seamless as a click. We realized that your journey 
                doesn't start when you board the bus, but the moment you decide to go.
              </p>
              <p>
                By digitizing the traditional transport infrastructure, we connect thousands of 
                passengers to their destinations through a network of premium operators, ensuring 
                that every mile you travel is backed by world-class technology.
              </p>
            </div>
          </div>

          {/* Attractive Stats Card Instead of Image */}
          <div className="lg:col-span-2">
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl transform hover:-rotate-2 transition-transform duration-500">
              <h3 className="text-xl font-bold mb-6 border-b border-blue-400 pb-2">JetBus by numbers</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-blue-100">10M+</div>
                  <div className="text-sm uppercase tracking-widest text-blue-200">Happy Travelers</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-blue-100">500+</div>
                  <div className="text-sm uppercase tracking-widest text-blue-200">Verified Routes</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-blue-100">24/7</div>
                  <div className="text-sm uppercase tracking-widest text-blue-200">Human Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why the world rides with us</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <ValueCard 
              icon={<FaShieldAlt />} 
              title="Secure Booking" 
              desc="Military-grade encryption for all your transactions and personal data."
            />
            <ValueCard 
              icon={<FaClock />} 
              title="Hyper Punctual" 
              desc="Our advanced scheduling algorithms minimize delays and wait times."
            />
            <ValueCard 
              icon={<FaAward />} 
              title="Premium Comfort" 
              desc="Hand-picked luxury buses with top-tier amenities for every passenger."
            />
          </div>
        </div>

        {/* Modern Mission Box */}
        <div className="mt-32 bg-gray-900 rounded-[2rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed italic">
              "To revolutionize the travel industry by providing a transparent, 
              safe, and highly efficient transport ecosystem that empowers everyone to explore."
            </p>
          </div>
        </div>
      </div>

      {/* --- Footer Section --- */}
      <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-black text-blue-600">
                <FaBus /> <span>JetBus</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Redefining the way people travel across cities with comfort, safety, and reliability.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaInstagram />} />
                <SocialIcon icon={<FaLinkedinIn />} />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Book a Ticket</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Route Map</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-blue-600" />
                  <span>123 Mobility Plaza, Silicon Valley, CA 94025</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-blue-600" />
                  <span>+1 (800) JET-BUS</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <span>support@jetbus.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} JetBus Technologies Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Component for consistency
const ValueCard = ({ icon, title, desc }) => (
  <div className="group p-10 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
    <div className="text-blue-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

// Helper Social Icon Component
const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default About;
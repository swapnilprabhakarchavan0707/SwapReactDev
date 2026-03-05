import React from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaRocket, 
  FaBus, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="flex-grow">
        {/* Header Section with JetBus/Modern Transport Theme Background */}
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 px-6 text-center text-white"
          style={{ 
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1471&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <h1 className="text-6xl font-black mb-4 tracking-tight flex items-center justify-center gap-4">
               Contact JetBus
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light">
              Premium Travel. Lightning Fast Support.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-20 px-6">
          {/* Centered Heading matched to About.js style */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Corporate Hub</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Contact Details in Cards matched to ValueCard style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Address Card */}
            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-blue-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global HQ</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                JetBus Sky Tower, <br />
                Financial District, Nanakramguda, <br />
                Hyderabad, TG - 500032
              </p>
            </div>

            {/* Phone Card */}
            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-blue-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaPhoneAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Priority Line</h3>
              <p className="text-gray-600 font-semibold">+91 800-JET-BUS</p>
              <p className="text-gray-500 text-sm mt-1">Available 24/7</p>
            </div>

            {/* Email Card */}
            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-blue-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Desk</h3>
              <p className="text-gray-600 text-sm">concierge@jetbus.com</p>
              <p className="text-gray-600 text-sm">media@jetbus.com</p>
            </div>

            {/* Working Hours Card */}
            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-blue-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Operations</h3>
              <p className="text-gray-600 text-sm">Fleet Status: 24/7</p>
              <p className="text-gray-600 text-sm">Office: Mon-Sat (9am-8pm)</p>
              <p className="text-xs text-blue-600 font-black mt-3 uppercase tracking-widest">Always On Call</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer Section */}
      <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-black text-blue-600">
                <FaBus /> JetBus
              </div>
              <p className="text-gray-500 leading-relaxed">
                Redefining intercity mobility with a focus on luxury, punctuality, and safety. Join the future of travel today.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaInstagram />} />
                <SocialIcon icon={<FaLinkedinIn />} />
              </div>
            </div>

            {/* Column 2: Navigation - Font size matched to Column 1 description */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 leading-relaxed">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Route Network</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Column 3: Legal - Font size matched to Column 1 description */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500 leading-relaxed">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            {/* Column 4: Support - Font size matched to Column 1 description */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-500 leading-relaxed">
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-blue-600" />
                  <span>+91 800-JET-BUS</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600" />
                  <span>support@jetbus.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} JetBus Mobility Corp. Built for speed and comfort.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default Contact;
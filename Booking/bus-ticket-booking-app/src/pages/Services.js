import React from 'react';
import { 
  FaBus, 
  FaShieldAlt, 
  FaWifi, 
  FaCreditCard, 
  FaHeadset, 
  FaRoute, 
  FaCheckCircle, 
  FaLifeRing, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaMobileAlt,
  FaApple,
  FaGooglePlay
} from 'react-icons/fa';

const Services = () => {
  const serviceList = [
    {
      id: 1,
      title: "Express Connectivity",
      desc: "Our JetBus fleet connects major cities with lightning speed, reducing travel time by 20% compared to standard operators.",
      icon: <FaBus className="text-4xl" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      title: "Luxury Amenities",
      desc: "Enjoy a premium experience with reclining leather seats, individual charging points, and extra legroom for every passenger.",
      icon: <FaRoute className="text-4xl" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 3,
      title: "High-Speed Wi-Fi",
      desc: "Stay productive or entertained with our complimentary StarLink-powered high-speed Wi-Fi available on all JetBus routes.",
      icon: <FaWifi className="text-4xl" />,
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      id: 4,
      title: "Smart Booking",
      desc: "Secure your seat in seconds via UPI, Credit Cards, or Net Banking with our zero-failure payment gateway.",
      icon: <FaCreditCard className="text-4xl" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 5,
      title: "24/7 Concierge",
      desc: "Our dedicated travel support team is available round the clock to assist you with rescheduling and boarding queries.",
      icon: <FaHeadset className="text-4xl" />,
      color: "bg-slate-100 text-slate-600"
    },
    {
      id: 6,
      title: "Safety First",
      desc: "Every JetBus is equipped with GPS tracking, emergency exits, and highly trained professional drivers for a secure journey.",
      icon: <FaShieldAlt className="text-4xl" />,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="flex-grow">
        {/* Help Hero Header - Matched to Global Theme */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mt-32"></div>
          
          <h1 className="text-6xl font-black mb-4 tracking-tight relative z-10 flex justify-center items-center gap-4">
            <FaLifeRing className="text-blue-300" /> How Can We Help?
          </h1>
          <p className="text-xl text-blue-200 opacity-90 max-w-2xl mx-auto font-light relative z-10">
            From premium on-board services to 24/7 booking assistance, JetBus is committed 
            to making your journey seamless and fast.
          </p>
        </div>

        {/* Help/Services Grid */}
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceList.map((service) => (
              <div 
                key={service.id} 
                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group"
              >
                <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Status/Trust Section */}
        <div className="max-w-6xl mx-auto mb-24 px-6">
          <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full -mr-24 -mb-24"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              "Your time is precious. <br/>
              <span className="text-blue-400 font-light italic text-2xl md:text-4xl">We handle the details, you enjoy the ride."</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 border-t border-slate-800 pt-12">
              <div>
                <div className="flex justify-center mb-2"><FaCheckCircle className="text-blue-400 text-xl" /></div>
                <p className="text-3xl font-black text-white">99.9%</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest mt-2">Punctuality Rate</p>
              </div>
              <div className="md:border-x border-slate-800">
                <div className="flex justify-center mb-2"><FaCheckCircle className="text-blue-400 text-xl" /></div>
                <p className="text-3xl font-black text-white">5-Star</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest mt-2">Safety Rating</p>
              </div>
              <div>
                <div className="flex justify-center mb-2"><FaCheckCircle className="text-blue-400 text-xl" /></div>
                <p className="text-3xl font-black text-white">Zero</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest mt-2">Hidden Fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Updated Footer Section matched to Contact.js Typography --- */}
      <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Branding Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-black text-blue-600">
                <FaBus /> <span>JetBus</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Leading the way in premium intercity travel with cutting-edge technology and a passenger-first approach.
              </p>
              <div className="flex gap-4">
                <SocialLink icon={<FaFacebookF />} />
                <SocialLink icon={<FaTwitter />} />
                <SocialLink icon={<FaInstagram />} />
                <SocialLink icon={<FaLinkedinIn />} />
              </div>
            </div>

            {/* Services Links - Updated Typography */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Our Services</h4>
              <ul className="space-y-4 text-gray-500 leading-relaxed">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Intercity Express</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Corporate Charters</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Luxury Fleet</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Route Planning</a></li>
              </ul>
            </div>

            {/* Support Links - Updated Typography */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Support Hub</h4>
              <ul className="space-y-4 text-gray-500 leading-relaxed">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Ticket Cancellation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Live Bus Tracking</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Mobile App Column - Updated Typography */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6 flex items-center gap-2">
                <FaMobileAlt className="text-blue-600" /> Travel on the Go
              </h4>
              <p className="text-gray-500 leading-relaxed mb-6">
                Download the JetBus app for exclusive deals and real-time tracking.
              </p>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all w-fit">
                  <FaApple className="text-xl" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-70">Download on the</p>
                    <p className="text-sm font-semibold leading-tight">App Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all w-fit">
                  <FaGooglePlay className="text-lg" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-70">Get it on</p>
                    <p className="text-sm font-semibold leading-tight">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} JetBus Technologies. All rights reserved.</p>
            <div className="flex gap-6 uppercase tracking-widest text-xs">
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Updated Social Link Helper
const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default Services;
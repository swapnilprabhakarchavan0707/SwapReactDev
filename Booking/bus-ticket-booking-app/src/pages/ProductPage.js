import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { 
    FaBus, FaCrown, FaBolt, FaShoppingCart, FaTimes, FaUser, 
    FaPhoneAlt, FaMapMarkerAlt, FaReceipt, FaRoute, FaQrcode 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const location = useLocation();
    const [buses, setBuses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || 'Sleeper');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedBus, setSelectedBus] = useState(null);
    const [bankDetails, setBankDetails] = useState(null);
    const [formData, setFormData] = useState({
        customer_name: '',
        contact_number: '',
        address: '', 
        transaction_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const prodRes = await axios.get('http://localhost:5000/api/admin/all-products');
                const bankRes = await axios.get('http://localhost:5000/api/admin/bank-details');
                setBuses(prodRes.data || []);
                setBankDetails(bankRes.data && bankRes.data.id ? bankRes.data : null); 
            } catch (err) {
                toast.error("Connectivity issue. Fleet data not loaded.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state]);

    const handleBookingStart = (bus) => {
        setSelectedBus(bus);
        setShowModal(true);
        setStep(1);
    };

    const handleNextStep = () => {
        if (!formData.customer_name || !formData.contact_number || !formData.address) {
            return toast.warn("Passenger details and Pickup point are required.");
        }
        setStep(2);
    };

    const handleFinalBooking = async () => {
        if (!formData.transaction_id) {
            return toast.warn("Payment Transaction ID is required to issue ticket.");
        }
        try {
            const payload = { 
                bus_id: selectedBus.id, 
                customer_name: formData.customer_name,
                contact_number: formData.contact_number,
                pickup_point: formData.address,
                transaction_id: formData.transaction_id,
                seats_reserved: 1 
            };

            await axios.post('http://localhost:5000/api/admin/book-ticket', payload);
            
            toast.success("Booking Request Sent! Admin will verify your Transaction ID in the Finance section.");
            setShowModal(false);
            setFormData({ customer_name: '', contact_number: '', address: '', transaction_id: '' });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Booking failed. System error.");
        }
    };

    const filteredBuses = buses.filter(item => item.product_type === selectedCategory);

    const busCategories = [
        { id: 'Sleeper', label: 'Sleeper', icon: <FaBus /> },
        { id: 'Luxury', label: 'Luxury', icon: <FaCrown /> },
        { id: 'Express', label: 'Express', icon: <FaBolt /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Reserve Your Seat</h1>
                    <p className="text-slate-500 text-lg">Select a fleet category and book your premium journey with JetBus.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-20">
                    {busCategories.map((cat) => (
                        <label key={cat.id} className="cursor-pointer">
                            <input 
                                type="radio" 
                                name="busCategory" 
                                value={cat.id} 
                                className="hidden" 
                                checked={selectedCategory === cat.id}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            />
                            <div className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] border-2 transition-all duration-300 
                                ${selectedCategory === cat.id 
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-2' 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:bg-indigo-50'}`}>
                                <span className="text-2xl">{cat.icon}</span>
                                <span className="font-black text-xl tracking-tight">{cat.label}</span>
                            </div>
                        </label>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredBuses.length > 0 ? (
                            filteredBuses.map((bus) => (
                                <div key={bus.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 flex flex-col group">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img 
                                            src={`http://localhost:5000/uploads/${bus.product_image}`} 
                                            alt={bus.product_name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600'; }}
                                        />
                                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl">
                                            <span className="text-indigo-600 font-black text-lg">₹{bus.product_price}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">{bus.product_name}</h3>
                                        <p className="text-slate-400 text-sm mb-8">Premium {bus.product_type} fleet with GPS tracking and push-back seats.</p>
                                        
                                        <button 
                                            onClick={() => handleBookingStart(bus)}
                                            className="mt-auto w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-95 shadow-lg"
                                        >
                                            <FaRoute /> Book Seat
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-xl font-bold text-slate-400">No {selectedCategory} buses scheduled today.</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* --- BOOKING MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-[3rem] p-10 relative shadow-2xl animate-in zoom-in duration-300">
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-indigo-600 transition-colors">
                            <FaTimes size={24} />
                        </button>

                        {step === 1 ? (
                            <div>
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Passenger Info</h2>
                                    <p className="text-slate-500">Confirm your journey details</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative"><FaUser className="absolute left-5 top-5 text-slate-300"/><input type="text" placeholder="Full Name" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})}/></div>
                                    <div className="relative"><FaPhoneAlt className="absolute left-5 top-5 text-slate-300"/><input type="text" placeholder="Mobile Number" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.contact_number} onChange={(e) => setFormData({...formData, contact_number: e.target.value})}/></div>
                                    <div className="relative"><FaMapMarkerAlt className="absolute left-5 top-5 text-slate-300"/><textarea placeholder="Pickup Point / City" rows="2" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea></div>
                                    <button onClick={handleNextStep} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Proceed to Payment</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-slate-900 uppercase">Payment</h2>
                                    <p className="text-slate-500 font-bold text-lg">Total Fare: ₹{selectedBus?.product_price}</p>
                                </div>
                                
                                <div className="bg-slate-900 text-white rounded-[2rem] p-8 mb-8 overflow-hidden">
                                    <h4 className="text-indigo-400 font-black mb-4 uppercase tracking-widest text-xs border-b border-slate-700 pb-2 flex items-center gap-2">
                                        <FaBus size={12}/> JetBus Corporate Account
                                    </h4>
                                    {bankDetails ? (
                                        <div className="space-y-2 text-xs">
                                            <p className="flex justify-between font-mono"><span className="text-slate-500">Bank:</span> <span className="font-bold">{bankDetails.bank_name}</span></p>
                                            <p className="flex justify-between font-mono"><span className="text-slate-500">Holder:</span> <span className="font-bold">{bankDetails.account_holder_name || bankDetails.account_name}</span></p>
                                            <p className="flex justify-between font-mono"><span className="text-slate-500">A/C No:</span> <span className="font-bold text-indigo-300">{bankDetails.account_number}</span></p>
                                            <p className="flex justify-between font-mono"><span className="text-slate-500">IFSC:</span> <span className="font-bold">{bankDetails.ifsc_code}</span></p>
                                            
                                            {/* UPI ID & QR SECTION */}
                                            {bankDetails.upi_id && (
                                                <div className="mt-4 pt-4 border-t border-slate-700">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="bg-white p-2 rounded-xl">
                                                            {/* Displaying a dynamic QR based on amount and UPI ID */}
                                                            <img 
                                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${bankDetails.upi_id}&pn=JetBus&am=${selectedBus?.product_price}&cu=INR`} 
                                                                alt="Payment QR" 
                                                                className="w-24 h-24"
                                                            />
                                                        </div>
                                                        <p className="flex flex-col items-center gap-1">
                                                            <span className="text-indigo-400 font-bold flex items-center gap-2 text-[10px] uppercase tracking-tighter">
                                                                <FaQrcode /> Scan or Pay to UPI ID:
                                                            </span>
                                                            <span className="text-base font-black tracking-wider text-emerald-400">{bankDetails.upi_id}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-red-400 text-center text-xs">Awaiting financial endpoints...</p>
                                    )}
                                </div>

                                <div className="relative mb-6">
                                    <FaReceipt className="absolute left-5 top-5 text-slate-300" />
                                    <input 
                                        type="text" 
                                        placeholder="Enter 12-digit Transaction ID" 
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono font-bold text-slate-800" 
                                        value={formData.transaction_id} 
                                        onChange={(e) => setFormData({...formData, transaction_id: e.target.value})}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-200 transition">Back</button>
                                    <button 
                                        onClick={handleFinalBooking} 
                                        className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        Finish Payment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
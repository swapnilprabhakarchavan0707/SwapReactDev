import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAllBuses, fetchBankDetails } from '../api';
import { 
    FaBus, FaClock, FaChair, FaArrowRight, FaTimes, 
    FaUser, FaPhoneAlt, FaMapMarkerAlt, FaReceipt, FaChevronLeft, FaTag
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Buses = () => {
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- Booking Modal States ---
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
        const getFleets = async () => {
            try {
                setLoading(true);
                const [busRes, bankRes] = await Promise.all([
                    fetchAllBuses(),
                    fetchBankDetails()
                ]);
                setBuses(busRes.data || []);
                setBankDetails(bankRes.data && bankRes.data.id ? bankRes.data : null);
            } catch (err) {
                toast.error("Failed to sync with terminal data.");
            } finally {
                setLoading(false);
            }
        };
        getFleets();
    }, []);

    const formatDateTime = (isoString) => {
        if (!isoString) return "TBA";
        const date = new Date(isoString);
        return date.toLocaleString('en-IN', { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
        });
    };

    // --- Booking Logic ---
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
            return toast.warn("Payment Transaction ID is required.");
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
            
            toast.success("Booking Request Sent! Admin will verify your payment.");
            setShowModal(false);
            setFormData({ customer_name: '', contact_number: '', address: '', transaction_id: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || "Booking failed.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Live Fleet Status</h1>
                    <p className="text-slate-500">Real-time schedule and availability from JetBus Terminal</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {buses.map((bus) => (
                        <div key={bus.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50 flex flex-col group">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={`http://localhost:5000/uploads/${bus.product_image}`} 
                                    alt={bus.product_name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'; }}
                                />
                                {/* Bus Type Badge Over Image */}
                                <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <FaTag className="text-indigo-400" /> {bus.bus_type || 'Express'}
                                </div>
                                
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                                    <span className="text-indigo-600 font-black text-xl">₹{bus.product_price}</span>
                                </div>
                            </div>

                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{bus.source || 'PUNE'}</span>
                                    <FaArrowRight className="text-slate-300 text-xs" />
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{bus.destination || 'MUMBAI'}</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight leading-tight">{bus.product_name}</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                                        <FaClock className="text-indigo-500" />
                                        <span className="text-sm">Departure: {formatDateTime(bus.departure_time)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                                        <FaChair className="text-indigo-500" />
                                        <span className="text-sm">Capacity: {bus.capacity || 40} Total Seats Available</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleBookingStart(bus)}
                                    className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors shadow-xl active:scale-95"
                                >
                                    <FaBus /> Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER BACK SECTION --- */}
                <div className="flex flex-col items-center border-t border-slate-200 pt-12 pb-8">
                    <p className="text-slate-400 mb-6 font-medium">Take Me Home</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="flex items-center gap-3 bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl text-slate-600 font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                    >
                        <FaChevronLeft /> Back to Home
                    </button>
                </div>
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
                                    <p className="text-slate-500 italic">{selectedBus?.product_name}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative"><FaUser className="absolute left-5 top-5 text-slate-300"/><input type="text" placeholder="Full Name" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})}/></div>
                                    <div className="relative"><FaPhoneAlt className="absolute left-5 top-5 text-slate-300"/><input type="text" placeholder="Mobile Number" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.contact_number} onChange={(e) => setFormData({...formData, contact_number: e.target.value})}/></div>
                                    <div className="relative"><FaMapMarkerAlt className="absolute left-5 top-5 text-slate-300"/><textarea placeholder="Pickup Point" rows="2" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition font-bold" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea></div>
                                    <button onClick={handleNextStep} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-indigo-700 transition-all">Proceed to Payment</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-slate-900 uppercase">Payment</h2>
                                    <p className="text-slate-500 font-bold text-lg">Total: ₹{selectedBus?.product_price}</p>
                                </div>
                                
                                <div className="bg-slate-900 text-white rounded-[2rem] p-8 mb-8">
                                    {bankDetails ? (
                                        <div className="space-y-2 text-xs">
                                            <p className="flex justify-between font-mono"><span>Bank:</span> <span>{bankDetails.bank_name}</span></p>
                                            <p className="flex justify-between font-mono"><span>A/C:</span> <span>{bankDetails.account_number}</span></p>
                                            <p className="flex justify-between font-mono"><span>IFSC:</span> <span>{bankDetails.ifsc_code}</span></p>
                                            {bankDetails.upi_id && (
                                                <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col items-center gap-3">
                                                    <div className="bg-white p-2 rounded-xl">
                                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${bankDetails.upi_id}&pn=JetBus&am=${selectedBus?.product_price}&cu=INR`} alt="QR" className="w-24 h-24"/>
                                                    </div>
                                                    <span className="text-emerald-400 font-black tracking-wider text-base">{bankDetails.upi_id}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : <p className="text-red-400">Loading bank info...</p>}
                                </div>

                                <div className="relative mb-6">
                                    <FaReceipt className="absolute left-5 top-5 text-slate-300" />
                                    <input type="text" placeholder="Transaction ID / UTR" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono font-bold" value={formData.transaction_id} onChange={(e) => setFormData({...formData, transaction_id: e.target.value})}/>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold">Back</button>
                                    <button onClick={handleFinalBooking} className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-emerald-700 transition-all">Confirm</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Buses;
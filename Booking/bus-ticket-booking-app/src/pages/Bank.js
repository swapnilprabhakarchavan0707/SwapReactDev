import React, { useState, useEffect } from 'react';
import { 
    FaUniversity, FaCheckCircle, FaHistory, FaCheck, FaTimes, 
    FaUser, FaBus, FaIdCard, FaMapMarkerAlt, FaQrcode 
} from 'react-icons/fa';
import { fetchBankDetails, updateBankDetails, fetchAllBookings, updateBookingStatus } from '../api';
import { toast } from 'react-toastify';

const Bank = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [bankData, setBankData] = useState({
        bank_name: '',
        account_number: '',
        ifsc_code: '',
        account_name: '',
        upi_id: '' // Maintained for database synchronization
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const bankRes = await fetchBankDetails();
            
            if (bankRes.data) {
                setBankData({
                    bank_name: bankRes.data.bank_name || '',
                    account_number: bankRes.data.account_number || '',
                    ifsc_code: bankRes.data.ifsc_code || '',
                    account_name: bankRes.data.account_holder_name || '',
                    upi_id: bankRes.data.upi_id || ''
                });
            }

            const bookingRes = await fetchAllBookings();
            setBookings(bookingRes.data || []);
        } catch (err) {
            toast.error("Failed to load Finance data");
        } finally {
            setLoading(false);
        }
    };

    const handleBankUpdate = async (e) => {
        e.preventDefault();
        try {
            // Mapping frontend 'account_name' back to 'account_holder_name' for backend consistency if necessary
            const payload = {
                ...bankData,
                account_holder_name: bankData.account_name
            };
            await updateBankDetails(payload);
            toast.success("Bank & UPI Details Updated Successfully");
            loadData(); 
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            toast.success(`Transaction ${newStatus}`);
            loadData(); 
        } catch (err) {
            toast.error("Status update failed");
        }
    };

    // Filter logic for tabs
    const verificationList = bookings.filter(b => b.status?.toLowerCase() === 'pending');
    const historyList = bookings.filter(b => b.status === 'Approved' || b.status === 'Rejected' || b.status === 'Confirmed' || b.status === 'Cancelled');

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <div className="text-center font-bold text-slate-600">Initializing Secure Finance Terminal...</div>
        </div>
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Finance Control</h1>
                <p className="text-slate-500">Manage bank settings, verify payments, and track revenue.</p>
            </div>

            {/* --- Navigation Tabs --- */}
            <div className="flex gap-4 mb-8 bg-white p-2 rounded-3xl shadow-sm inline-flex">
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                    <FaUniversity /> Bank Settings
                </button>
                <button 
                    onClick={() => setActiveTab('verification')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'verification' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                    <FaCheckCircle /> Verification 
                    {verificationList.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{verificationList.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                    <FaHistory /> History
                </button>
            </div>

            {/* --- Content Sections --- */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                
                {/* 1) BANK SETTINGS */}
                {activeTab === 'settings' && (
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Corporate Bank & UPI Details</h2>
                        <form onSubmit={handleBankUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-slate-600 ml-2">Account Holder Name</label>
                                <input type="text" value={bankData.account_name} onChange={(e) => setBankData({...bankData, account_name: e.target.value})} className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition" placeholder="Enter Name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-slate-600 ml-2">Bank Name</label>
                                <input type="text" value={bankData.bank_name} onChange={(e) => setBankData({...bankData, bank_name: e.target.value})} className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition" placeholder="Enter Bank" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-slate-600 ml-2">Account Number</label>
                                <input type="text" value={bankData.account_number} onChange={(e) => setBankData({...bankData, account_number: e.target.value})} className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition" placeholder="Enter Account No." />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-slate-600 ml-2">IFSC Code</label>
                                <input type="text" value={bankData.ifsc_code} onChange={(e) => setBankData({...bankData, ifsc_code: e.target.value})} className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition" placeholder="Enter IFSC" />
                            </div>
                            
                            {/* UPI ID FIELD */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="font-bold text-slate-600 ml-2 flex items-center gap-2"><FaQrcode className="text-indigo-500"/> UPI ID (Mobile Payment)</label>
                                <input type="text" value={bankData.upi_id} onChange={(e) => setBankData({...bankData, upi_id: e.target.value})} className="bg-indigo-50/50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition border border-indigo-100 font-mono text-indigo-700" placeholder="example@upi" />
                            </div>
                            
                            <button type="submit" className="md:col-span-2 mt-4 bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-lg uppercase tracking-widest">Update Account Info</button>
                        </form>
                    </div>
                )}

                {/* 2) & 3) VERIFICATION & HISTORY TABLE */}
                {(activeTab === 'verification' || activeTab === 'history') && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-400 uppercase text-sm tracking-widest border-b border-slate-100">
                                    <th className="pb-6 pl-4">Customer</th>
                                    <th className="pb-6">Bus Details</th>
                                    <th className="pb-6">Seats</th>
                                    <th className="pb-6">Transaction ID</th>
                                    <th className="pb-6 text-center">Actions / Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {(activeTab === 'verification' ? verificationList : historyList).map((item) => (
                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold"><FaUser size={14}/></div>
                                                <div>
                                                    <div className="font-black text-slate-800">{item.customer_name}</div>
                                                    <div className="text-xs text-slate-400">{item.contact_number}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                                                <FaBus className="text-indigo-400"/> {item.product_name || item.bus_name || "N/A"}
                                            </div>
                                            <div className="text-xs text-indigo-600 font-bold flex items-center gap-1 mt-1">
                                                <FaMapMarkerAlt size={10}/> {item.source} → {item.destination}
                                            </div>
                                        </td>
                                        <td className="py-6 font-bold text-slate-600">{item.seats_reserved || 1} Seat(s)</td>
                                        <td className="py-6">
                                            <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-mono text-sm font-bold border border-slate-200">
                                                {item.transaction_id}
                                            </span>
                                        </td>
                                        <td className="py-6 text-center">
                                            {activeTab === 'verification' ? (
                                                <div className="flex gap-2 justify-center">
                                                    <button 
                                                        onClick={() => handleStatusUpdate(item.id, 'Approved')}
                                                        className="bg-emerald-100 text-emerald-600 p-3 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                        title="Approve Payment"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(item.id, 'Rejected')}
                                                        className="bg-rose-100 text-rose-600 p-3 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                        title="Reject Payment"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter ${
                                                    (item.status === 'Approved' || item.status === 'Confirmed') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {(activeTab === 'verification' ? verificationList : historyList).length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center">
                                            <FaIdCard className="text-6xl mx-auto mb-4 text-slate-100" />
                                            <h3 className="text-xl font-bold text-slate-300">No records found in this section</h3>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bank;
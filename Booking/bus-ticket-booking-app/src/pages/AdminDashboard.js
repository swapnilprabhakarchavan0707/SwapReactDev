import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { 
  FaUsers, FaBus, FaPlus, FaTrash, FaUniversity, FaEdit, 
  FaCheck, FaTimes, FaRoute, FaTicketAlt, FaClock, FaMapMarkerAlt, FaQrcode
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ admins: 0, buses: 0, pendingBookings: 0 });
  const [admins, setAdmins] = useState([]);

  const token = localStorage.getItem('adminToken');
  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('adminData')) || {}, []);

  const config = useMemo(() => ({ 
    headers: { Authorization: `Bearer ${token}` } 
  }), [token]);

  const fetchAdmins = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/all', config);
      setAdmins(res.data || []);
      setStats(prev => ({ ...prev, admins: (res.data || []).length }));
    } catch (err) { console.error(err); }
  }, [config]);

  const fetchBusStats = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/all-buses', config);
      setStats(prev => ({ ...prev, buses: (res.data || []).length }));
    } catch (err) { console.error(err); }
  }, [config]);

  const fetchBookingStats = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/all-bookings', config);
      const pending = (res.data || []).filter(r => r.status === 'Pending').length;
      setStats(prev => ({ ...prev, pendingBookings: pending }));
    } catch (err) { console.error(err); }
  }, [config]);

  useEffect(() => {
    fetchAdmins();
    fetchBusStats();
    fetchBookingStats();
  }, [fetchAdmins, fetchBusStats, fetchBookingStats]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6 border-b"><h2 className="text-xl font-bold text-blue-600">JetBus Admin</h2></div>
        <nav className="mt-6">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-6 py-3 ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'}`}><FaRoute className="mr-3"/> Overview</button>
          <button onClick={() => setActiveTab('admins')} className={`w-full flex items-center px-6 py-3 ${activeTab === 'admins' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'}`}><FaUsers className="mr-3"/> Manage Admins</button>
          <button onClick={() => setActiveTab('buses')} className={`w-full flex items-center px-6 py-3 ${activeTab === 'buses' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'}`}><FaBus className="mr-3"/> Fleet</button>
          <button onClick={() => setActiveTab('bank')} className={`w-full flex items-center px-6 py-3 ${activeTab === 'bank' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'}`}><FaUniversity className="mr-3"/> Finance</button>
        </nav>
      </div>

      <div className="flex-1 ml-64 p-10">
        <header className="mb-8"><h1 className="text-3xl font-black capitalize">{activeTab}</h1></header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<FaUsers />} title="Admins" value={stats.admins} color="bg-gray-700" />
            <StatCard icon={<FaBus />} title="Buses" value={stats.buses} color="bg-blue-600" />
            <StatCard icon={<FaTicketAlt />} title="Pending" value={stats.pendingBookings} color="bg-emerald-500" />
          </div>
        )}

        <div className="mt-8 bg-white rounded-[2rem] shadow-xl p-8">
          {activeTab === 'admins' && <AdminList admins={admins} onRefresh={fetchAdmins} config={config} currentUser={currentUser} />}
          {activeTab === 'buses' && <BusManagement onRefresh={fetchBusStats} config={config} />}
          {activeTab === 'bank' && <BankFinanceTabs config={config} refreshStats={fetchBookingStats} />}
        </div>
      </div>
    </div>
  );
};

// --- ADMIN LIST COMPONENT ---
const AdminList = ({ admins, onRefresh, config, currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', full_name: '', email: '', phone: '', password: '' });

  const handleOpenModal = (admin = null) => {
    if (admin) {
      setFormData({ id: admin.id, full_name: admin.full_name, email: admin.email, phone: admin.phone, password: '' });
      setIsEditing(true);
    } else {
      setFormData({ id: '', full_name: '', email: '', phone: '', password: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/admin/update`, formData, config);
        toast.success("Details updated!");
        if (formData.id === currentUser.id) {
            const updatedData = { ...currentUser, full_name: formData.full_name, email: formData.email, phone: formData.phone };
            localStorage.setItem('adminData', JSON.stringify(updatedData));
        }
      } else {
        await axios.post(`http://localhost:5000/api/admin/add-admin`, formData, config);
        toast.success("Admin added!");
      }
      setShowModal(false);
      onRefresh();
    } catch (err) { toast.error(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this admin?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, config);
        toast.success("Deleted");
        onRefresh();
      } catch (err) { toast.error("Failed"); }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black">Admin Management</h3>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2"><FaPlus /> New Admin</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 text-xs uppercase font-black border-b">
            <th className="py-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {admins.map(admin => (
            <tr key={admin.id} className="hover:bg-gray-50">
              <td className="py-4 font-bold">{admin.full_name}</td>
              <td>{admin.email}</td>
              <td>{admin.is_default ? 'Super Admin' : 'Staff'}</td>
              <td className="flex gap-3 text-lg py-4">
                {(currentUser.is_default || !admin.is_default || currentUser.id === admin.id) && (
                  <button onClick={() => handleOpenModal(admin)} className="text-blue-500"><FaEdit /></button>
                )}
                {!admin.is_default && (
                  <button onClick={() => handleDelete(admin.id)} className="text-red-400"><FaTrash /></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl w-96 shadow-2xl">
            <h2 className="text-2xl font-black mb-6">{isEditing ? 'Edit Profile' : 'Add Admin'}</h2>
            <div className="space-y-4">
              <input className="w-full border p-3 rounded-xl" placeholder="Full Name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required />
              <input className="w-full border p-3 rounded-xl" type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              <input className="w-full border p-3 rounded-xl" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <input className="w-full border p-3 rounded-xl" type="password" placeholder={isEditing ? "New Password (Optional)" : "Password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required={!isEditing} />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-gray-400">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// --- BUS MANAGEMENT COMPONENT ---
const BusManagement = ({ onRefresh, config }) => {
  const [buses, setBuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    bus_name: '', bus_number: '', source: '', destination: '',
    departure_time: '', arrival_time: '', ticket_price: '',
    bus_type: 'AC Sleeper', total_seats: 40, bus_image: null
  });

  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/all-buses', config);
      setBuses(res.data || []);
    } catch (err) { console.error(err); }
  }, [config]);

  useEffect(() => { fetchBuses(); }, [fetchBuses]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const handleOpenModal = (bus = null) => {
    if (bus) {
      setEditId(bus.id);
      setFormData({ 
        bus_name: bus.product_name || bus.bus_name, 
        bus_number: bus.bus_number, 
        source: bus.source, 
        destination: bus.destination, 
        departure_time: formatDateTime(bus.departure_time), 
        arrival_time: formatDateTime(bus.arrival_time), 
        ticket_price: bus.product_price || bus.ticket_price, 
        bus_type: bus.product_type || bus.bus_type, 
        total_seats: bus.total_seats, 
        bus_image: null 
      });
    } else {
      setEditId(null);
      setFormData({ bus_name: '', bus_number: '', source: '', destination: '', departure_time: '', arrival_time: '', ticket_price: '', bus_type: 'AC Sleeper', total_seats: 40, bus_image: null });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Fixed: Append all standard fields
    Object.keys(formData).forEach(key => {
      if (key !== 'bus_image' && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    // Fixed: Key name must match upload.single('bus_image') in backend
    if (formData.bus_image) {
      data.append('bus_image', formData.bus_image);
    }

    try {
      if (editId) {
        data.append('id', editId);
        await axios.put(`http://localhost:5000/api/admin/update-bus`, data, {
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Bus Updated Successfully");
      } else {
        await axios.post(`http://localhost:5000/api/admin/add-bus`, data, {
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Bus Added Successfully");
      }
      setShowModal(false);
      fetchBuses();
      onRefresh();
    } catch (err) { 
        toast.error(err.response?.data?.message || "Error saving bus"); 
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black">Fleet Management</h3>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white px-4 py-2 rounded-xl">+ Add Bus</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {buses.map(bus => (
          <div key={bus.id} className="flex justify-between items-center p-4 border rounded-2xl hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><FaBus /></div>
              <div>
                <p className="font-bold">{bus.product_name || bus.bus_name} <span className="text-xs text-gray-400 font-normal">({bus.bus_number})</span></p>
                <p className="text-xs text-gray-500">{bus.source} → {bus.destination}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleOpenModal(bus)} className="text-blue-500"><FaEdit /></button>
              <button onClick={async () => { if(window.confirm("Delete?")) { await axios.delete(`http://localhost:5000/api/admin/delete-bus/${bus.id}`, config); fetchBuses(); onRefresh(); } }} className="text-red-400"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black mb-6">{editId ? 'Edit Bus Route' : 'Add New Bus'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-3 rounded-xl" placeholder="Bus Name" value={formData.bus_name} onChange={e => setFormData({...formData, bus_name: e.target.value})} required />
              <input className="border p-3 rounded-xl" placeholder="Bus Number" value={formData.bus_number} onChange={e => setFormData({...formData, bus_number: e.target.value})} required />
              <input className="border p-3 rounded-xl" placeholder="Source" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} required />
              <input className="border p-3 rounded-xl" placeholder="Destination" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} required />
              <div className="flex flex-col"><label className="text-xs ml-2 text-gray-400">Departure</label><input className="border p-3 rounded-xl" type="datetime-local" value={formData.departure_time} onChange={e => setFormData({...formData, departure_time: e.target.value})} required /></div>
              <div className="flex flex-col"><label className="text-xs ml-2 text-gray-400">Arrival</label><input className="border p-3 rounded-xl" type="datetime-local" value={formData.arrival_time} onChange={e => setFormData({...formData, arrival_time: e.target.value})} required /></div>
              <input className="border p-3 rounded-xl" type="number" placeholder="Price (₹)" value={formData.ticket_price} onChange={e => setFormData({...formData, ticket_price: e.target.value})} required />
              <select className="border p-3 rounded-xl" value={formData.bus_type} onChange={e => setFormData({...formData, bus_type: e.target.value})}>
                <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                <option value="Seater">Seater</option>
              </select>
              <input className="border p-3 rounded-xl" type="number" placeholder="Total Seats" value={formData.total_seats} onChange={e => setFormData({...formData, total_seats: e.target.value})} required />
              <input className="border p-3 rounded-xl" type="file" onChange={e => setFormData({...formData, bus_image: e.target.files[0]})} />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-400">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Save Bus</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// --- BANK & FINANCE TABS ---
const BankFinanceTabs = ({ config, refreshStats }) => {
  const [subTab, setSubTab] = useState('details');
  return (
    <div>
      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setSubTab('details')} className={`pb-2 font-bold ${subTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}>Bank Settings</button>
        <button onClick={() => setSubTab('requests')} className={`pb-2 font-bold ${subTab === 'requests' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}>Verification</button>
        <button onClick={() => setSubTab('transactions')} className={`pb-2 font-bold ${subTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}>History</button>
      </div>
      {subTab === 'details' && <BankManagement config={config} />}
      {subTab === 'requests' && <RequestApproval config={config} refreshStats={refreshStats} />}
      {subTab === 'transactions' && <TransactionRecord config={config} />}
    </div>
  );
};

const BankManagement = ({ config }) => {
    const [bankData, setBankData] = useState({ 
        bank_name: '', 
        account_holder_name: '', 
        account_number: '', 
        ifsc_code: '',
        upi_id: '' 
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/bank-details', config)
            .then(res => setBankData(res.data))
            .catch(err => console.log(err));
    }, [config]);

    const handleUpdate = async () => {
        try {
            await axios.post('http://localhost:5000/api/admin/update-bank', bankData, config);
            toast.success("Bank & UPI details updated");
        } catch (err) { toast.error("Update failed"); }
    }

    return (
        <div className="space-y-4 max-w-md bg-gray-50 p-6 rounded-2xl">
            <div>
              <label className="text-xs font-bold text-gray-500 ml-1">Bank Information</label>
              <input className="w-full border p-3 rounded-xl bg-white mt-1 mb-3" placeholder="Bank Name" value={bankData.bank_name} onChange={e => setBankData({...bankData, bank_name: e.target.value})} />
              <input className="w-full border p-3 rounded-xl bg-white mb-3" placeholder="Account Holder" value={bankData.account_holder_name} onChange={e => setBankData({...bankData, account_holder_name: e.target.value})} />
              <input className="w-full border p-3 rounded-xl bg-white mb-3" placeholder="Account Number" value={bankData.account_number} onChange={e => setBankData({...bankData, account_number: e.target.value})} />
              <input className="w-full border p-3 rounded-xl bg-white mb-3" placeholder="IFSC Code" value={bankData.ifsc_code} onChange={e => setBankData({...bankData, ifsc_code: e.target.value})} />
            </div>

            <div className="pt-4 border-t">
              <label className="text-xs font-bold text-blue-600 ml-1 flex items-center gap-1"><FaQrcode /> Digital Payment (UPI)</label>
              <input 
                className="w-full border border-blue-100 p-3 rounded-xl bg-white mt-1 font-mono text-blue-600 placeholder:text-gray-300" 
                placeholder="example@upi" 
                value={bankData.upi_id || ''} 
                onChange={e => setBankData({...bankData, upi_id: e.target.value})} 
              />
            </div>

            <button onClick={handleUpdate} className="bg-slate-900 text-white px-6 py-3 rounded-xl w-full font-bold mt-4 shadow-lg hover:bg-blue-600 transition-colors">
              Update Finance Settings
            </button>
        </div>
    )
}

const RequestApproval = ({ config, refreshStats }) => {
    const [requests, setRequests] = useState([]);
    const fetch = useCallback(() => {
        axios.get('http://localhost:5000/api/admin/all-bookings', config)
            .then(res => setRequests((res.data || []).filter(r => r.status === 'Pending')))
            .catch(err => console.log(err));
    }, [config]);
    useEffect(() => { fetch(); }, [fetch]);

    const handleAction = async (id, status) => {
        try {
            await axios.post('http://localhost:5000/api/admin/update-booking-status', { id, action: status }, config);
            toast.success(`Booking ${status}`);
            fetch();
            refreshStats();
        } catch (err) { toast.error("Action failed"); }
    }

    return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="py-3">Customer</th>
                <th>Bus Details</th>
                <th>Seats</th>
                <th>Transaction ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
                {requests.map(req => (
                    <tr key={req.id}>
                        <td className="py-4">
                          <p className="font-bold">{req.customer_name}</p>
                          <p className="text-xs text-gray-400">{req.contact_number}</p>
                        </td>
                        <td>
                          <p className="text-sm font-medium">{req.product_name || req.bus_name}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{req.source} → {req.destination}</p>
                        </td>
                        <td className="font-bold">{req.seats_reserved}</td>
                        <td><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-mono">{req.transaction_id}</span></td>
                        <td className="py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleAction(req.id, 'Confirmed')} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"><FaCheck /></button>
                              <button onClick={() => handleAction(req.id, 'Cancelled')} className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><FaTimes /></button>
                            </div>
                        </td>
                    </tr>
                ))}
                {requests.length === 0 && <tr><td colSpan="5" className="py-10 text-center text-gray-400">No pending verification requests</td></tr>}
            </tbody>
          </table>
        </div>
    )
}

const TransactionRecord = ({ config }) => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/all-bookings', config)
            .then(res => setHistory((res.data || []).filter(r => r.status !== 'Pending')))
            .catch(err => console.error(err));
    }, [config]);

    return (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="py-3">Txn ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
                {history.map(txn => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="py-4 text-xs font-mono text-gray-500">{txn.transaction_id}</td>
                        <td>
                          <p className="font-bold">{txn.customer_name}</p>
                          <p className="text-xs text-gray-400">{txn.product_name || txn.bus_name}</p>
                        </td>
                        <td>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${txn.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="text-gray-400 text-sm">{new Date(txn.booked_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                {history.length === 0 && <tr><td colSpan="4" className="py-10 text-center text-gray-400">No booking history found</td></tr>}
            </tbody>
          </table>
        </div>
    )
}

const StatCard = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-3xl text-white ${color} flex items-center shadow-lg`}>
    <div className="text-3xl mr-4">{icon}</div>
    <div><p className="text-sm opacity-80">{title}</p><p className="text-2xl font-bold">{value}</p></div>
  </div>
);

export default AdminDashboard;
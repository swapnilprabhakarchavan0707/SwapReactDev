import axios from 'axios';

const API_URL = "http://localhost:5000/api/admin";

const getHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

// --- Authentication ---
export const loginAdmin = (data) => axios.post(`${API_URL}/login`, data);

// --- Admin Management ---
export const fetchAllAdmins = () => axios.get(`${API_URL}/all`, getHeader());
export const addAdminAccount = (data) => axios.post(`${API_URL}/add-admin`, data, getHeader());
export const updateAdminAccount = (data) => axios.put(`${API_URL}/update`, data, getHeader());
export const deleteAdminAccount = (id) => axios.delete(`${API_URL}/delete/${id}`, getHeader());

// --- Fleet / Bus Management ---
// ADD
export const addBus = (formData) => axios.post(`${API_URL}/add-bus`, formData, {
    headers: { ...getHeader().headers, 'Content-Type': 'multipart/form-data' }
});

// UPDATE (Crucial for Edit functionality)
export const updateBus = (formData) => axios.put(`${API_URL}/update-bus`, formData, {
    headers: { ...getHeader().headers, 'Content-Type': 'multipart/form-data' }
});

// DELETE
export const deleteBus = (id) => axios.delete(`${API_URL}/delete-bus/${id}`, getHeader());

export const fetchAllBuses = () => axios.get(`${API_URL}/all-buses`);

/**
 * Updated to match the backend search logic.
 * This powers the filtered views in ProductCategory.js
 */
export const fetchBusesByType = (type) => axios.get(`${API_URL}/search-buses?type=${type}`);

// --- Bank Finance ---
export const fetchBankDetails = () => axios.get(`${API_URL}/bank-details`);
export const updateBankDetails = (data) => axios.post(`${API_URL}/update-bank`, data, getHeader());

// --- Bookings ---
/**
 * Used by the ProductPage modal to submit the passenger info and transaction ID
 */
export const submitBookingRequest = (data) => axios.post(`${API_URL}/book-ticket`, data);

export const fetchAllBookings = () => axios.get(`${API_URL}/all-bookings`, getHeader());

/**
 * Standard status update (Pending/Approved/Cancelled)
 */
export const updateBookingStatus = (id, status) => 
    axios.post(`${API_URL}/update-booking-status`, { id, status }, getHeader());

/**
 * Specialized approval for finance verification
 */
export const approveBookingStatus = (data) => axios.post(`${API_URL}/update-booking-status`, data, getHeader());

export default {
    loginAdmin,
    fetchAllAdmins,
    addAdminAccount,
    updateAdminAccount,
    deleteAdminAccount,
    addBus,
    updateBus,
    deleteBus,
    fetchAllBuses,
    fetchBusesByType,
    fetchBankDetails,
    updateBankDetails,
    submitBookingRequest,
    fetchAllBookings,
    updateBookingStatus,
    approveBookingStatus
};
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const busController = require('../controllers/busController');
const upload = require('../middleware/upload'); 
const verifyAdmin = require('../middleware/auth'); 

// --- Admin Authentication & Management ---
router.post('/login', adminController.login);
router.get('/all', verifyAdmin, adminController.getAllAdmins);
router.post('/add-admin', verifyAdmin, adminController.addAdmin);
router.put('/update', verifyAdmin, adminController.updateAdmin);
router.delete('/delete/:id', verifyAdmin, adminController.deleteAdmin);

// --- Bus / Fleet Management ---
// Public routes for customers
// These provide the data for your "Buses" page and "ProductPage"
router.get('/all-buses', busController.getAllBuses);
router.get('/search-buses', busController.searchBuses);

/**
 * ADD BUS
 * Logic: verifyAdmin checks token -> upload.single handles the image -> controller saves to DB
 */
router.post('/add-bus', verifyAdmin, upload.single('bus_image'), busController.addBus);

/**
 * UPDATE BUS (FIXED)
 * Logic: Must use upload.single('bus_image') even if image is not changed.
 * This is because Multer parses the text fields (id, bus_name, price, etc.) 
 * from the FormData so that adminController/busController can see them in req.body.
 */
router.put('/update-bus', verifyAdmin, upload.single('bus_image'), busController.updateBus);

// DELETE BUS
router.delete('/delete-bus/:id', verifyAdmin, busController.deleteBus);

// --- Bank & Finance ---
// Public route for customers to fetch payment details (Bank + UPI)
router.get('/bank-details', adminController.getBankDetails);

// Protected route for admins to update Bank/UPI info
router.post('/update-bank', verifyAdmin, adminController.updateBank);

// --- Booking Management ---
router.get('/all-bookings', verifyAdmin, adminController.getAllBookings);
router.post('/update-booking-status', verifyAdmin, adminController.verifyBooking);

// Public route for customers to submit their booking
router.post('/book-ticket', adminController.bookTicket);

module.exports = router;
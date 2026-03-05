require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./config/db'); 
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors()); 

// Body parsers: Increased limits to handle potential high-resolution bus images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 2. REQUEST LOGGER (Debugging Tool)
app.use((req, res, next) => {
    if (req.method !== 'GET') {
        console.log(`[${new Date().toLocaleString()}] ${req.method} request to ${req.url}`);
    }
    next();
});

// 3. STATIC FILES
// Serves images from the uploads folder. 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. TEST/PUBLIC API ROUTES
// Updated with Aliases to ensure Frontend compatibility (product_name, product_price)
app.get('/api/buses', async (req, res) => {
  try {
    const sql = `SELECT 
      id, 
      bus_name AS product_name, 
      bus_number, 
      source, 
      destination, 
      departure_time, 
      arrival_time, 
      ticket_price AS product_price, 
      bus_type AS product_type, 
      total_seats, 
      bus_image AS product_image 
      FROM buses ORDER BY departure_time ASC`;
      
    const [rows] = await db.execute(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Database error fetching bus routes", error: error.message });
  }
});

// 5. MAIN ADMIN & BOOKING API ROUTES
// All routes in adminRoutes will be prefixed with /api/admin
app.use('/api/admin', adminRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error("Global Server Error:", err.stack);
    res.status(500).json({ 
        success: false, 
        message: "Internal Server Error", 
        error: process.env.NODE_ENV === 'development' ? err.message : {} 
    });
});

const PORT = process.env.PORT || 5000;

// 6. INITIALIZATION
// Ensure the system has a place to store uploaded bus images
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(" 'uploads' folder created successfully.");
}

app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(' Bus Ticket Booking Backend Initialized Successfully!');
    console.log(`--------------------------------------------------`);
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Uploads available at http://localhost:${PORT}/uploads/`);
    console.log(` Database connectivity established`);
    console.log(`--------------------------------------------------`);
});
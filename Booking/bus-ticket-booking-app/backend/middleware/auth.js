const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * AUTH MIDDLEWARE
 * Purpose: Verifies the JWT token for Bus Operators/Admins before allowing 
 * access to protected routes like adding a bus or managing bookings.
 */

// This checks the .env file first, otherwise uses your provided static key
const JWT_SECRET = process.env.JWT_SECRET || "1ee82473248561b55ea096e9ab029a607c87c919ee863e98fbfa338507be22e2";

module.exports = (req, res, next) => {
    // 1. Get token from the Authorization header (Expected format: "Bearer <token>")
    const authHeader = req.header('Authorization');
    
    // 2. Check if header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(`[${new Date().toLocaleString()}] Auth Middleware: Access Denied. No valid token header.`);
        return res.status(401).json({ 
            success: false, 
            message: "Authorization denied. Please log in." 
        });
    }

    // Extract the token part from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log(`[${new Date().toLocaleString()}] Auth Middleware: Token string is empty.`);
        return res.status(401).json({ 
            success: false, 
            message: "Authentication token missing." 
        });
    }

    try {
        // 3. Verify the token using our secret
        const decoded = jwt.verify(token, JWT_SECRET);
        
        /**
         * 4. Attach the decoded payload to the request object.
         * The payload contains { id, is_default }.
         * This is CRITICAL for adminController.js to compare 
         * 'req.admin.id' (the person logged in) with the 'id' being updated.
         */
        req.admin = decoded;
        
        // Debugging log to confirm which admin is performing the action
        console.log(`[${new Date().toLocaleString()}] Authorized Request: Admin ID ${decoded.id}`);
        
        next(); // Proceed to the actual route handler
    } catch (err) {
        // Handle specific JWT errors
        let errorMsg = "Token is not valid";
        
        if (err.name === 'TokenExpiredError') {
            errorMsg = "Your session has expired. Please log in again.";
        }

        console.log(`[${new Date().toLocaleString()}] Auth Middleware Error:`, err.message);
        
        res.status(401).json({ 
            success: false, 
            message: errorMsg 
        });
    }
};
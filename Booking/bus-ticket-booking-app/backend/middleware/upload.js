const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * FILE UPLOAD MIDDLEWARE (Multer)
 * Purpose: Handles uploading bus images to the local 'uploads' directory.
 */

// Ensure 'uploads' directory exists to prevent server-side errors
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Files will be saved in the 'uploads' folder
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create a unique filename: timestamp + original name
        // Example: 1771525876932-luxury-bus.png
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')); 
    }
});

// File filter to ensure only valid images are uploaded
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    
    // Check extension and mimetype
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        // Provide a clear error for the frontend toast to display
        cb(new Error('Format Error: Only jpeg, jpg, png, and webp are supported.'));
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 5 * 1024 * 1024 // 5MB limit per image
    }, 
    fileFilter: fileFilter
});

/**
 * NOTE FOR UPDATE FUNCTIONALITY:
 * When using this in your routes, ensure you use upload.single('bus_image') 
 * for both the ADD and UPDATE routes. Even if no new image is uploaded 
 * during an update, Multer will process the text fields (id, bus_name, etc.) 
 * so they are available in req.body.
 */

module.exports = upload;
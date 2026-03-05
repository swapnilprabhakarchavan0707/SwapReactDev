const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "1ee82473248561b55ea096e9ab029a607c87c919ee863e98fbfa338507be22e2";

// --- Authentication ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(400).json({ success: false, message: "Operator not found" });

        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: rows[0].id, is_default: rows[0].is_default }, JWT_SECRET, { expiresIn: '1d' });
        const { password: _, ...adminData } = rows[0];
        res.json({ success: true, token, admin: adminData });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Operator Management ---
exports.addAdmin = async (req, res) => {
    const { full_name, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO admins (full_name, email, phone, password, is_default) VALUES (?, ?, ?, ?, 0)', [full_name, email, phone, hashedPassword]);
        res.status(201).json({ success: true, message: "New operator added" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateAdmin = async (req, res) => {
    const { id, full_name, email, phone, password } = req.body;
    const requesterId = req.admin.id; 

    try {
        const [target] = await db.execute('SELECT id, is_default FROM admins WHERE id = ?', [id]);
        if (target.length === 0) return res.status(404).json({ message: "Admin not found" });

        if (target[0].is_default === 1 && requesterId !== target[0].id) {
            return res.status(403).json({ success: false, message: "Unauthorized to edit Super Admin" });
        }

        let query = 'UPDATE admins SET full_name=?, email=?, phone=?';
        let params = [full_name, email, phone];

        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password=?';
            params.push(hashedPassword);
        }

        query += ' WHERE id=?';
        params.push(id);

        await db.execute(query, params);
        res.json({ success: true, message: "Details updated successfully" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const [target] = await db.execute('SELECT is_default FROM admins WHERE id = ?', [id]);
        if (target[0].is_default) return res.status(403).json({ message: "Cannot delete Super Admin" });
        await db.execute('DELETE FROM admins WHERE id = ?', [id]);
        res.json({ success: true, message: "Admin removed" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, full_name, email, phone, is_default FROM admins');
        res.json(rows);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// --- Fleet / Bus Management ---

exports.getAllBuses = async (req, res) => {
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
            bus_image AS product_image,
            created_at 
            FROM buses 
            ORDER BY created_at DESC`;
            
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addBus = async (req, res) => {
    const { 
        bus_name, bus_number, source, destination, 
        departure_time, arrival_time, ticket_price, 
        bus_type, total_seats 
    } = req.body;
    const bus_image = req.file ? req.file.filename : null;

    try {
        const query = `INSERT INTO buses 
            (bus_name, bus_number, source, destination, departure_time, arrival_time, ticket_price, bus_type, total_seats, bus_image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.execute(query, [
            bus_name, bus_number, source, destination, 
            departure_time, arrival_time, ticket_price, 
            bus_type, total_seats, bus_image
        ]);

        res.status(201).json({ success: true, message: "Bus added successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBus = async (req, res) => {
    const { 
        id, bus_name, bus_number, source, destination, 
        departure_time, arrival_time, ticket_price, 
        bus_type, total_seats 
    } = req.body;

    const new_image = req.file ? req.file.filename : null;

    try {
        const [existingBus] = await db.execute('SELECT * FROM buses WHERE id = ?', [id]);
        if (existingBus.length === 0) {
            return res.status(404).json({ success: false, message: "Bus not found" });
        }

        let query = `UPDATE buses SET 
            bus_name = ?, bus_number = ?, source = ?, destination = ?, 
            departure_time = ?, arrival_time = ?, ticket_price = ?, 
            bus_type = ?, total_seats = ?`;
        
        let params = [
            bus_name, bus_number, source, destination, 
            departure_time, arrival_time, ticket_price, 
            bus_type, total_seats
        ];

        if (new_image) {
            query += `, bus_image = ?`;
            params.push(new_image);
        }

        query += ` WHERE id = ?`;
        params.push(id);

        await db.execute(query, params);
        res.json({ success: true, message: "Bus updated successfully!" });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.deleteBus = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM buses WHERE id = ?', [id]);
        res.json({ success: true, message: "Bus deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchBuses = async (req, res) => {
    const { type } = req.query;
    try {
        const sql = `SELECT 
            id, 
            bus_name AS product_name, 
            ticket_price AS product_price, 
            bus_type AS product_type, 
            bus_image AS product_image 
            FROM buses WHERE bus_type = ?`;
            
        const [rows] = await db.execute(sql, [type]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Bank Details ---
exports.updateBank = async (req, res) => {
    const { bank_name, account_name, account_number, ifsc_code, upi_id } = req.body;
    const admin_id = req.admin.id; 

    try {
        const sql = `INSERT INTO bank_details (id, admin_id, bank_name, account_holder_name, account_number, ifsc_code, upi_id) 
                     VALUES (1, ?, ?, ?, ?, ?, ?) 
                     ON DUPLICATE KEY UPDATE 
                     admin_id=VALUES(admin_id), 
                     bank_name=VALUES(bank_name), 
                     account_holder_name=VALUES(account_holder_name), 
                     account_number=VALUES(account_number), 
                     ifsc_code=VALUES(ifsc_code),
                     upi_id=VALUES(upi_id)`;
        
        await db.execute(sql, [admin_id, bank_name, account_name, account_number, ifsc_code, upi_id]);
        res.json({ success: true, message: "Bank & UPI settings updated successfully" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getBankDetails = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM bank_details WHERE id = 1');
        res.json(rows[0] || {});
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Booking & Verification Logic ---
exports.bookTicket = async (req, res) => {
    const { bus_id, customer_name, contact_number, pickup_point, transaction_id, seats_reserved } = req.body;
    try {
        const sql = `INSERT INTO bookings (bus_id, customer_name, contact_number, pickup_point, transaction_id, status, seats_reserved) 
                     VALUES (?, ?, ?, ?, ?, 'Pending', ?)`;
        await db.execute(sql, [bus_id, customer_name, contact_number, pickup_point, transaction_id, seats_reserved || 1]);
        res.status(201).json({ success: true, message: "Booking request submitted for verification" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const sql = `
            SELECT b.*, bus.bus_name AS product_name 
            FROM bookings b 
            LEFT JOIN buses bus ON b.bus_id = bus.id 
            ORDER BY b.id DESC`;
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.verifyBooking = async (req, res) => {
    const { id, action } = req.body; 
    try {
        await db.execute('UPDATE bookings SET status = ? WHERE id = ?', [action, id]);
        res.json({ success: true, message: `Booking ${action} successfully` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
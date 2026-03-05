const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function migratePasswords() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'ticket_booking_system'
  });

  // 1. Get all admins
  const [admins] = await connection.execute('SELECT id, password FROM admins');

  for (let admin of admins) {
    // Check if it's already hashed (Bcrypt hashes usually start with $2)
    if (!admin.password.startsWith('$2')) {
      console.log(`Hashing password for ID: ${admin.id}...`);
      
      // 2. Hash the plain text password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(admin.password, saltRounds);

      // 3. Update the database
      await connection.execute(
        'UPDATE admins SET password = ? WHERE id = ?',
        [hashedPassword, admin.id]
      );
    }
  }

  console.log('All passwords have been secured!');
  process.exit();
}

migratePasswords();
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || ''
  });

  try {
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'runtoken';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created or already exists`);
    
    // Create test database if it doesn't exist
    const testDbName = process.env.DB_NAME_TEST || 'runtoken_test';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${testDbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Test database '${testDbName}' created or already exists`);
    
    console.log('🎉 Database setup completed successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Make sure XAMPP MySQL is running');
    console.log('   2. Update your .env file with the correct database credentials');
    console.log('   3. Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('💡 Make sure XAMPP MySQL is running and accessible');
  } finally {
    await connection.end();
  }
}

setupDatabase(); 
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function simpleSetup() {
  console.log('🚀 Starting RunToken Simple Setup...\n');

  // 1. Create .env file if it doesn't exist
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=runtoken

# Google OAuth Configuration (optional - leave empty to disable)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# JWT Configuration
JWT_SECRET=super_secret_jwt_key_for_development_change_in_production

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created with default values\n');
  } else {
    console.log('✅ .env file already exists\n');
  }

  // 2. Load environment variables
  require('dotenv').config();

  // 3. Create database
  try {
    console.log('🗄️  Setting up database...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || ''
    });

    const dbName = process.env.DB_NAME || 'runtoken';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' ready`);
    await connection.end();
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('💡 Make sure XAMPP MySQL is running on port 3306');
    return;
  }

  // 4. Test database connection with models
  try {
    console.log('🔗 Testing database connection...');
    const { sequelize } = require('./models');
    await sequelize.authenticate();
    console.log('✅ Database connection successful\n');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return;
  }

  console.log('🎉 Setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Make sure XAMPP MySQL is running');
  console.log('2. Run: npm run dev');
  console.log('3. Open: http://localhost:5173');
  console.log('4. Login with email/password (register first)');
  console.log('\n🔧 Optional: To enable Google OAuth:');
  console.log('   - Get credentials from Google Cloud Console');
  console.log('   - Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
}

simpleSetup().catch(console.error); 
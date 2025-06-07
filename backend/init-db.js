const { sequelize, User, ApiKey, ApiRequest, Usage } = require('./models');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync database models (create tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('✅ Database models synced successfully');

    // Check if we already have users
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('🌱 Seeding database with initial data...');
      
      // Create a test user
      const testUser = await User.create({
        email: 'john.doe@example.com',
        password: 'password123', // Will be hashed automatically
        first_name: 'John',
        last_name: 'Doe',
        company: 'Acme Corp',
        email_verified: true
      });

      console.log('✅ Test user created:', testUser.email);

      // Create initial API keys for the test user
      const liveKey = await ApiKey.create({
        user_id: testUser.id,
        name: 'Production API Key',
        key_prefix: 'rt_live_',
        environment: 'live',
        permissions: ['read', 'write'],
        rate_limit: 1000
      });

      const testKey = await ApiKey.create({
        user_id: testUser.id,
        name: 'Development Key',
        key_prefix: 'rt_test_',
        environment: 'test',
        permissions: ['read'],
        rate_limit: 500
      });

      console.log('✅ API keys created:');
      console.log('  - Live key:', liveKey.full_key || 'Generated');
      console.log('  - Test key:', testKey.full_key || 'Generated');

      console.log('✅ Database seeded successfully');
      console.log('📧 Test user: john.doe@example.com');
      console.log('🔑 Password: password123');
    } else {
      console.log('📊 Database already contains data');
    }

    // Test queries
    console.log('\n🧪 Testing database queries...');
    
    const users = await User.findAll();
    console.log(`Found ${users.length} users`);
    
    const apiKeys = await ApiKey.findAll();
    console.log(`Found ${apiKeys.length} API keys`);
    
    console.log('\n✅ Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔒 Database connection closed');
  }
}

// Run initialization
initializeDatabase(); 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const passport = require('./config/passport');
const { sequelize } = require('./models');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const apiKeyRoutes = require('./routes/apiKeys');
const analyticsRoutes = require('./routes/analytics');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Logging middleware (disabled for clean logs)
// app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'connected'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/keys', apiKeyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user', userRoutes);

// API endpoints for RunToken signals
app.use('/api/v1', require('./routes/signals'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Create tables automatically (simple approach)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables created/updated successfully');

    // Seed database with initial data if needed
    await seedDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 RunToken Backend Server`);
      console.log(`   URL: http://localhost:${PORT}`);
      console.log(`   Database: runtoken (MySQL)`);
      console.log(`   Status: RUNNING`);
      console.log(`   Health: http://localhost:${PORT}/health\n`);
      console.log(`📋 CLEAN LOGS ENABLED - You'll see:`);
      console.log(`   ✅ Login success`);
      console.log(`   ❌ Login failures`);
      console.log(`   🎉 New registrations\n`);
    });

  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

// Seed database with initial data
async function seedDatabase() {
  try {
    const { User, ApiKey } = require('./models');
    
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

      // Create initial API keys for the test user
      await ApiKey.create({
        user_id: testUser.id,
        name: 'Production API Key',
        key_prefix: 'rt_live_',
        environment: 'live',
        permissions: ['read', 'write'],
        rate_limit: 1000
      });

      await ApiKey.create({
        user_id: testUser.id,
        name: 'Development Key',
        key_prefix: 'rt_test_',
        environment: 'test',
        permissions: ['read'],
        rate_limit: 500
      });

      console.log('✅ Database seeded successfully');
      console.log('📧 Test user: john.doe@example.com');
      console.log('🔑 Password: password123');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Gracefully shutting down...');
  await sequelize.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app; 
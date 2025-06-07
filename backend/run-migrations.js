const { Sequelize } = require('sequelize');
const config = require('./config/database');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);

async function runMigrations() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Run migrations in order
    const { Umzug, SequelizeStorage } = require('umzug');
    
    const umzug = new Umzug({
      migrations: {
        glob: 'migrations/*.js',
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    // Run migrations
    await umzug.up();
    console.log('✅ All migrations completed successfully');

    // Sync models (for any additional model changes)
    const { sequelize: modelSequelize } = require('./models');
    await modelSequelize.sync({ alter: true });
    console.log('✅ Models synced successfully');

    console.log('🎉 Database setup completed!');
    
  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations; 
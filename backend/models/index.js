const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize
let sequelize;
if (dbConfig.storage) {
  // SQLite
  sequelize = new Sequelize(dbConfig);
} else {
  // PostgreSQL/MySQL
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const ApiKey = require('./ApiKey')(sequelize, Sequelize.DataTypes);
const ApiRequest = require('./ApiRequest')(sequelize, Sequelize.DataTypes);
const Usage = require('./Usage')(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(ApiKey, { foreignKey: 'user_id', as: 'apiKeys' });
ApiKey.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ApiRequest, { foreignKey: 'user_id', as: 'apiRequests' });
ApiRequest.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

ApiKey.hasMany(ApiRequest, { foreignKey: 'api_key_id', as: 'requests' });
ApiRequest.belongsTo(ApiKey, { foreignKey: 'api_key_id', as: 'apiKey' });

User.hasMany(Usage, { foreignKey: 'user_id', as: 'usage' });
Usage.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

ApiKey.hasMany(Usage, { foreignKey: 'api_key_id', as: 'usage' });
Usage.belongsTo(ApiKey, { foreignKey: 'api_key_id', as: 'apiKey' });

// Export models and sequelize instance
const db = {
  sequelize,
  Sequelize,
  User,
  ApiKey,
  ApiRequest,
  Usage
};

module.exports = db; 
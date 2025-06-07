const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define('ApiKey', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    key_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    key_prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'revoked'),
      defaultValue: 'active'
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: ['read']
    },
    rate_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
      validate: {
        min: 1,
        max: 10000
      }
    },
    environment: {
      type: DataTypes.ENUM('live', 'test'),
      defaultValue: 'live'
    },
    last_used: {
      type: DataTypes.DATE,
      allowNull: true
    },
    request_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'api_keys',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeValidate: async (apiKey) => {
        if (!apiKey.key_hash) {
          const fullKey = ApiKey.generateKey(apiKey.key_prefix);
          apiKey.key_hash = ApiKey.hashKey(fullKey);
          // Store the full key temporarily for return to user (only on creation)
          apiKey.full_key = fullKey;
        }
      }
    }
  });

  // Class methods
  ApiKey.generateKey = function(prefix = 'rt_live_') {
    const randomBytes = crypto.randomBytes(16);
    return prefix + randomBytes.toString('hex');
  };

  ApiKey.hashKey = function(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
  };

  ApiKey.findByKey = async function(key) {
    const hashedKey = this.hashKey(key);
    return await this.findOne({ 
      where: { 
        key_hash: hashedKey,
        status: 'active'
      },
      include: ['user']
    });
  };

  // Instance methods
  ApiKey.prototype.validateKey = function(key) {
    const hashedKey = ApiKey.hashKey(key);
    return this.key_hash === hashedKey;
  };

  ApiKey.prototype.incrementUsage = async function() {
    this.request_count += 1;
    this.last_used = new Date();
    await this.save();
  };

  ApiKey.prototype.toSafeJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.key_hash;
    // Show masked key for display
    values.key = values.key_prefix + 'x'.repeat(27);
    return values;
  };

  return ApiKey;
}; 
module.exports = (sequelize, DataTypes) => {
  const Usage = sequelize.define('Usage', {
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
    api_key_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'api_keys',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    request_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    success_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    error_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total_response_time: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    avg_response_time: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    data_transferred: {
      type: DataTypes.BIGINT, // in bytes
      defaultValue: 0
    },
    cost: {
      type: DataTypes.DECIMAL(10, 6),
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
    tableName: 'usage',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'api_key_id', 'date']
      },
      {
        fields: ['user_id', 'date']
      },
      {
        fields: ['api_key_id', 'date']
      }
    ]
  });

  // Class methods
  Usage.recordUsage = async function(userId, apiKeyId, responseTime, statusCode, dataSize) {
    const today = new Date().toISOString().split('T')[0];
    
    const [usage, created] = await this.findOrCreate({
      where: {
        user_id: userId,
        api_key_id: apiKeyId,
        date: today
      },
      defaults: {
        user_id: userId,
        api_key_id: apiKeyId,
        date: today,
        request_count: 1,
        success_count: statusCode >= 200 && statusCode < 300 ? 1 : 0,
        error_count: statusCode >= 400 ? 1 : 0,
        total_response_time: responseTime,
        avg_response_time: responseTime,
        data_transferred: dataSize || 0,
        cost: 0.0005 // $0.0005 per request
      }
    });

    if (!created) {
      // Update existing record
      usage.request_count += 1;
      if (statusCode >= 200 && statusCode < 300) {
        usage.success_count += 1;
      }
      if (statusCode >= 400) {
        usage.error_count += 1;
      }
      usage.total_response_time += responseTime;
      usage.avg_response_time = usage.total_response_time / usage.request_count;
      usage.data_transferred += dataSize || 0;
      usage.cost += 0.0005;
      
      await usage.save();
    }

    return usage;
  };

  Usage.getUserUsageStats = async function(userId, days = 30) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await this.findAll({
      where: {
        user_id: userId,
        date: {
          [sequelize.Sequelize.Op.between]: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
        }
      },
      order: [['date', 'ASC']],
      raw: true
    });
  };

  Usage.getTotalUsageStats = async function(userId) {
    const stats = await this.findAll({
      where: { user_id: userId },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('request_count')), 'total_requests'],
        [sequelize.fn('SUM', sequelize.col('success_count')), 'total_success'],
        [sequelize.fn('SUM', sequelize.col('error_count')), 'total_errors'],
        [sequelize.fn('AVG', sequelize.col('avg_response_time')), 'overall_avg_response_time'],
        [sequelize.fn('SUM', sequelize.col('data_transferred')), 'total_data_transferred'],
        [sequelize.fn('SUM', sequelize.col('cost')), 'total_cost']
      ],
      raw: true
    });

    return stats[0];
  };

  return Usage;
}; 
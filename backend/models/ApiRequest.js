module.exports = (sequelize, DataTypes) => {
  const ApiRequest = sequelize.define('ApiRequest', {
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
      allowNull: false,
      references: {
        model: 'api_keys',
        key: 'id'
      }
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH'),
      allowNull: false
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    response_time: {
      type: DataTypes.INTEGER, // in milliseconds
      allowNull: false
    },
    request_size: {
      type: DataTypes.INTEGER, // in bytes
      defaultValue: 0
    },
    response_size: {
      type: DataTypes.INTEGER, // in bytes
      defaultValue: 0
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(2), // ISO country code
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'api_requests',
    timestamps: false, // Only need created_at for logs
    indexes: [
      {
        fields: ['user_id', 'created_at']
      },
      {
        fields: ['api_key_id', 'created_at']
      },
      {
        fields: ['status_code']
      },
      {
        fields: ['endpoint']
      },
      {
        fields: ['created_at']
      }
    ]
  });

  // Class methods for analytics
  ApiRequest.getUsageStats = async function(userId, timeRange = '7d') {
    const whereClause = { user_id: userId };
    
    // Add time range filter
    if (timeRange !== 'all') {
      const days = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      whereClause.created_at = {
        [sequelize.Sequelize.Op.gte]: startDate
      };
    }

    const stats = await this.findAll({
      where: whereClause,
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_requests'],
        [sequelize.fn('AVG', sequelize.col('response_time')), 'avg_response_time'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END')), 'success_count'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN status_code >= 400 THEN 1 END')), 'error_count']
      ],
      raw: true
    });

    return stats[0];
  };

  ApiRequest.getStatusCodeDistribution = async function(userId, timeRange = '7d') {
    const whereClause = { user_id: userId };
    
    if (timeRange !== 'all') {
      const days = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      whereClause.created_at = {
        [sequelize.Sequelize.Op.gte]: startDate
      };
    }

    return await this.findAll({
      where: whereClause,
      attributes: [
        'status_code',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status_code'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true
    });
  };

  ApiRequest.getTopEndpoints = async function(userId, timeRange = '7d', limit = 10) {
    const whereClause = { user_id: userId };
    
    if (timeRange !== 'all') {
      const days = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      whereClause.created_at = {
        [sequelize.Sequelize.Op.gte]: startDate
      };
    }

    return await this.findAll({
      where: whereClause,
      attributes: [
        'endpoint',
        'method',
        [sequelize.fn('COUNT', sequelize.col('id')), 'request_count'],
        [sequelize.fn('AVG', sequelize.col('response_time')), 'avg_response_time']
      ],
      group: ['endpoint', 'method'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit,
      raw: true
    });
  };

  ApiRequest.getGeographicDistribution = async function(userId, timeRange = '7d') {
    const whereClause = { 
      user_id: userId,
      country: {
        [sequelize.Sequelize.Op.ne]: null
      }
    };
    
    if (timeRange !== 'all') {
      const days = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      whereClause.created_at = {
        [sequelize.Sequelize.Op.gte]: startDate
      };
    }

    return await this.findAll({
      where: whereClause,
      attributes: [
        'country',
        [sequelize.fn('COUNT', sequelize.col('id')), 'request_count']
      ],
      group: ['country'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 10,
      raw: true
    });
  };

  return ApiRequest;
}; 
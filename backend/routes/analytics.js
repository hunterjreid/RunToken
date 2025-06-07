const express = require('express');
const { ApiRequest, Usage, User, ApiKey } = require('../models');
const router = express.Router();

// Middleware to authenticate requests (simplified for demo)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  // In a real app, you'd verify the JWT token here
  req.userId = 1; // Mock user ID
  next();
};

// GET /api/analytics/overview - Get overview analytics
router.get('/overview', authenticate, async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const userId = req.userId;

    // Get usage stats
    const usageStats = await ApiRequest.getUsageStats(userId, timeRange);
    
    // Get total usage stats
    const totalStats = await Usage.getTotalUsageStats(userId);

    // Calculate success rate
    const successRate = usageStats.total_requests > 0 
      ? ((usageStats.success_count / usageStats.total_requests) * 100).toFixed(1)
      : 0;

    const analytics = {
      totalRequests: parseInt(usageStats.total_requests) || 0,
      avgResponseTime: Math.round(usageStats.avg_response_time) || 0,
      successRate: parseFloat(successRate),
      totalCost: parseFloat(totalStats.total_cost) || 0,
      timeRange
    };

    res.json(analytics);

  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/status-codes - Get status code distribution
router.get('/status-codes', authenticate, async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const userId = req.userId;

    const statusCodes = await ApiRequest.getStatusCodeDistribution(userId, timeRange);
    
    // Calculate total for percentages
    const total = statusCodes.reduce((sum, item) => sum + parseInt(item.count), 0);
    
    const distribution = statusCodes.map(item => ({
      code: item.status_code,
      count: parseInt(item.count),
      percentage: total > 0 ? ((parseInt(item.count) / total) * 100).toFixed(1) : 0
    }));

    res.json(distribution);

  } catch (error) {
    console.error('Error fetching status code distribution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/endpoints - Get top endpoints
router.get('/endpoints', authenticate, async (req, res) => {
  try {
    const { timeRange = '7d', limit = 10 } = req.query;
    const userId = req.userId;

    const endpoints = await ApiRequest.getTopEndpoints(userId, timeRange, parseInt(limit));
    
    const formattedEndpoints = endpoints.map(item => ({
      method: item.method,
      path: item.endpoint,
      requests: parseInt(item.request_count),
      avgTime: Math.round(item.avg_response_time)
    }));

    res.json(formattedEndpoints);

  } catch (error) {
    console.error('Error fetching top endpoints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/geographic - Get geographic distribution
router.get('/geographic', authenticate, async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const userId = req.userId;

    const geoData = await ApiRequest.getGeographicDistribution(userId, timeRange);
    
    // Country name mapping
    const countryNames = {
      'US': 'United States',
      'GB': 'United Kingdom', 
      'DE': 'Germany',
      'FR': 'France',
      'CA': 'Canada',
      'JP': 'Japan',
      'AU': 'Australia',
      'BR': 'Brazil',
      'IN': 'India',
      'CN': 'China'
    };

    const countryFlags = {
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'DE': '🇩🇪', 
      'FR': '🇫🇷',
      'CA': '🇨🇦',
      'JP': '🇯🇵',
      'AU': '🇦🇺',
      'BR': '🇧🇷',
      'IN': '🇮🇳',
      'CN': '🇨🇳'
    };

    // Calculate total for percentages
    const total = geoData.reduce((sum, item) => sum + parseInt(item.request_count), 0);
    
    const distribution = geoData.map(item => ({
      code: item.country,
      name: countryNames[item.country] || item.country,
      flag: countryFlags[item.country] || '🌍',
      requests: parseInt(item.request_count),
      percentage: total > 0 ? ((parseInt(item.request_count) / total) * 100).toFixed(1) : 0
    }));

    res.json(distribution);

  } catch (error) {
    console.error('Error fetching geographic distribution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/usage-over-time - Get usage over time
router.get('/usage-over-time', authenticate, async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const userId = req.userId;
    
    const days = parseInt(timeRange.replace('d', ''));
    const usageData = await Usage.getUserUsageStats(userId, days);

    // Fill in missing days with zero values
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const dateRange = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(d.toISOString().split('T')[0]);
    }

    const filledData = dateRange.map(date => {
      const existing = usageData.find(item => item.date === date);
      return {
        date,
        requests: existing ? existing.request_count : 0,
        successCount: existing ? existing.success_count : 0,
        errorCount: existing ? existing.error_count : 0,
        avgResponseTime: existing ? existing.avg_response_time : 0,
        cost: existing ? parseFloat(existing.cost) : 0
      };
    });

    res.json(filledData);

  } catch (error) {
    console.error('Error fetching usage over time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/recent-errors - Get recent errors
router.get('/recent-errors', authenticate, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const userId = req.userId;

    const recentErrors = await ApiRequest.findAll({
      where: {
        user_id: userId,
        status_code: {
          [ApiRequest.sequelize.Sequelize.Op.gte]: 400
        }
      },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      raw: true
    });

    const formattedErrors = recentErrors.map(error => ({
      id: error.id,
      timestamp: error.created_at,
      endpoint: error.endpoint,
      method: error.method,
      status: error.status_code,
      error: error.error_message || `HTTP ${error.status_code}`,
      responseTime: error.response_time
    }));

    res.json(formattedErrors);

  } catch (error) {
    console.error('Error fetching recent errors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/api-key/:id - Get analytics for specific API key
router.get('/api-key/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { timeRange = '7d' } = req.query;
    const userId = req.userId;

    // Verify API key belongs to user
    const apiKey = await ApiKey.findOne({
      where: { id, user_id: userId }
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // Get usage stats for this specific API key
    const whereClause = { 
      user_id: userId,
      api_key_id: id
    };

    if (timeRange !== 'all') {
      const days = parseInt(timeRange.replace('d', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      whereClause.created_at = {
        [ApiRequest.sequelize.Sequelize.Op.gte]: startDate
      };
    }

    const stats = await ApiRequest.findAll({
      where: whereClause,
      attributes: [
        [ApiRequest.sequelize.fn('COUNT', ApiRequest.sequelize.col('id')), 'total_requests'],
        [ApiRequest.sequelize.fn('AVG', ApiRequest.sequelize.col('response_time')), 'avg_response_time'],
        [ApiRequest.sequelize.fn('COUNT', ApiRequest.sequelize.literal('CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END')), 'success_count'],
        [ApiRequest.sequelize.fn('COUNT', ApiRequest.sequelize.literal('CASE WHEN status_code >= 400 THEN 1 END')), 'error_count']
      ],
      raw: true
    });

    const result = stats[0];
    const successRate = result.total_requests > 0 
      ? ((result.success_count / result.total_requests) * 100).toFixed(1)
      : 0;

    const analytics = {
      apiKeyId: id,
      apiKeyName: apiKey.name,
      totalRequests: parseInt(result.total_requests) || 0,
      avgResponseTime: Math.round(result.avg_response_time) || 0,
      successRate: parseFloat(successRate),
      errorCount: parseInt(result.error_count) || 0,
      timeRange
    };

    res.json(analytics);

  } catch (error) {
    console.error('Error fetching API key analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 
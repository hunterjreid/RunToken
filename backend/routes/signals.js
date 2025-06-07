const express = require('express');
const { ApiKey, ApiRequest, Usage } = require('../models');
const router = express.Router();

// Middleware to authenticate API requests using API keys
const authenticateApiKey = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'API key required',
        message: 'Please provide your API key in the Authorization header as Bearer <api_key>'
      });
    }

    const apiKey = authHeader.substring(7);
    
    // Find API key in database
    const keyRecord = await ApiKey.findByKey(apiKey);
    
    if (!keyRecord) {
      return res.status(401).json({ 
        error: 'Invalid API key',
        message: 'The provided API key is invalid or has been revoked'
      });
    }

    // Check if user is active
    if (!keyRecord.user.is_active) {
      return res.status(403).json({ 
        error: 'Account inactive',
        message: 'Your account has been deactivated'
      });
    }

    // Store API key and user info for later use
    req.apiKey = keyRecord;
    req.userId = keyRecord.user_id;
    
    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Middleware to log API requests
const logRequest = async (req, res, next) => {
  const startTime = Date.now();
  
  // Override res.json to capture response
  const originalJson = res.json;
  res.json = function(data) {
    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    // Log the request asynchronously
    setImmediate(async () => {
      try {
        await ApiRequest.create({
          user_id: req.userId,
          api_key_id: req.apiKey.id,
          endpoint: req.originalUrl,
          method: req.method,
          status_code: statusCode,
          response_time: responseTime,
          request_size: JSON.stringify(req.body).length,
          response_size: JSON.stringify(data).length,
          ip_address: req.ip || req.connection.remoteAddress,
          user_agent: req.get('User-Agent'),
          country: req.headers['cf-ipcountry'] || null, // Cloudflare country header
          city: req.headers['cf-ipcity'] || null,
          error_message: statusCode >= 400 ? (data.error || data.message) : null
        });

        // Update API key usage
        await req.apiKey.incrementUsage();

        // Record usage statistics
        await Usage.recordUsage(
          req.userId,
          req.apiKey.id,
          responseTime,
          statusCode,
          JSON.stringify(data).length
        );

      } catch (logError) {
        console.error('Error logging API request:', logError);
      }
    });

    // Call original json method
    originalJson.call(this, data);
  };

  next();
};

// POST /api/v1/signals/generate - Generate trading signals
router.post('/signals/generate', authenticateApiKey, logRequest, async (req, res) => {
  try {
    const { symbol, timeframe, indicators } = req.body;

    // Validate request
    if (!symbol) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Symbol is required'
      });
    }

    // Simulate signal generation
    const signal = {
      id: Math.random().toString(36).substring(2, 15),
      symbol: symbol.toUpperCase(),
      timeframe: timeframe || '1h',
      timestamp: new Date().toISOString(),
      signal: ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)],
      confidence: (Math.random() * 0.5 + 0.5).toFixed(2), // 0.5-1.0
      price: (Math.random() * 1000 + 100).toFixed(2),
      indicators: {
        rsi: (Math.random() * 100).toFixed(2),
        macd: (Math.random() * 2 - 1).toFixed(4),
        bollinger_bands: {
          upper: (Math.random() * 1000 + 110).toFixed(2),
          middle: (Math.random() * 1000 + 100).toFixed(2),
          lower: (Math.random() * 1000 + 90).toFixed(2)
        },
        ...(indicators || {})
      },
      risk_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      target_price: (Math.random() * 1000 + 120).toFixed(2),
      stop_loss: (Math.random() * 1000 + 80).toFixed(2)
    };

    res.json({
      success: true,
      data: signal,
      metadata: {
        generated_at: new Date().toISOString(),
        api_version: 'v1',
        rate_limit_remaining: req.apiKey.rate_limit - (req.apiKey.request_count % req.apiKey.rate_limit),
        usage_cost: 0.0005
      }
    });

  } catch (error) {
    console.error('Error generating signal:', error);
    res.status(500).json({
      error: 'Signal generation failed',
      message: 'Unable to generate trading signal at this time'
    });
  }
});

// POST /api/v1/signals/validate - Validate trading signals
router.post('/signals/validate', authenticateApiKey, logRequest, async (req, res) => {
  try {
    const { signal_id, actual_outcome } = req.body;

    if (!signal_id) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Signal ID is required'
      });
    }

    // Simulate validation
    const validation = {
      signal_id,
      validation_status: 'completed',
      accuracy_score: (Math.random() * 0.4 + 0.6).toFixed(2), // 0.6-1.0
      actual_outcome: actual_outcome || 'unknown',
      validated_at: new Date().toISOString(),
      performance_metrics: {
        profit_loss: (Math.random() * 200 - 100).toFixed(2),
        duration: Math.floor(Math.random() * 3600) + 'seconds',
        max_drawdown: (Math.random() * 0.1).toFixed(3)
      }
    };

    res.json({
      success: true,
      data: validation,
      metadata: {
        validated_at: new Date().toISOString(),
        api_version: 'v1'
      }
    });

  } catch (error) {
    console.error('Error validating signal:', error);
    res.status(500).json({
      error: 'Signal validation failed',
      message: 'Unable to validate signal at this time'
    });
  }
});

// GET /api/v1/signals/history - Get signal history
router.get('/signals/history', authenticateApiKey, logRequest, async (req, res) => {
  try {
    const { limit = 50, offset = 0, symbol, timeframe } = req.query;

    // Simulate signal history
    const signals = [];
    const count = Math.min(parseInt(limit), 100);
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setHours(date.getHours() - i);
      
      signals.push({
        id: Math.random().toString(36).substring(2, 15),
        symbol: symbol || ['BTCUSD', 'ETHUSD', 'AAPL', 'TSLA'][Math.floor(Math.random() * 4)],
        timeframe: timeframe || '1h',
        timestamp: date.toISOString(),
        signal: ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)],
        confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
        price: (Math.random() * 1000 + 100).toFixed(2),
        status: ['active', 'closed', 'expired'][Math.floor(Math.random() * 3)]
      });
    }

    res.json({
      success: true,
      data: signals,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: 1000, // Mock total
        has_more: parseInt(offset) + signals.length < 1000
      },
      metadata: {
        generated_at: new Date().toISOString(),
        api_version: 'v1'
      }
    });

  } catch (error) {
    console.error('Error fetching signal history:', error);
    res.status(500).json({
      error: 'Failed to fetch signal history',
      message: 'Unable to retrieve signal history at this time'
    });
  }
});

// GET /api/v1/account/usage - Get account usage statistics
router.get('/account/usage', authenticateApiKey, logRequest, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    // Get usage statistics from database
    const { Usage: UsageModel } = require('../models');
    const totalStats = await UsageModel.getTotalUsageStats(req.userId);
    
    const usage = {
      user_id: req.userId,
      api_key_id: req.apiKey.id,
      current_period: {
        requests: parseInt(totalStats.total_requests) || 0,
        cost: parseFloat(totalStats.total_cost) || 0,
        success_rate: totalStats.total_requests > 0 
          ? ((totalStats.total_success / totalStats.total_requests) * 100).toFixed(1)
          : 0
      },
      rate_limits: {
        requests_per_minute: req.apiKey.rate_limit,
        requests_used_today: req.apiKey.request_count % 1440, // Approximate daily usage
        reset_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      },
      billing: {
        cost_per_request: 0.0005,
        currency: 'USD',
        billing_cycle: 'monthly'
      }
    };

    res.json({
      success: true,
      data: usage,
      metadata: {
        generated_at: new Date().toISOString(),
        api_version: 'v1'
      }
    });

  } catch (error) {
    console.error('Error fetching account usage:', error);
    res.status(500).json({
      error: 'Failed to fetch usage statistics',
      message: 'Unable to retrieve account usage at this time'
    });
  }
});

// DELETE /api/v1/signals/cleanup - Clean up old signals
router.delete('/signals/cleanup', authenticateApiKey, logRequest, async (req, res) => {
  try {
    const { older_than_days = 30 } = req.body;

    // Simulate cleanup
    const deletedCount = Math.floor(Math.random() * 100);
    
    res.json({
      success: true,
      data: {
        deleted_count: deletedCount,
        cleanup_date: new Date().toISOString(),
        criteria: `Signals older than ${older_than_days} days`
      },
      metadata: {
        processed_at: new Date().toISOString(),
        api_version: 'v1'
      }
    });

  } catch (error) {
    console.error('Error cleaning up signals:', error);
    res.status(500).json({
      error: 'Signal cleanup failed',
      message: 'Unable to clean up signals at this time'
    });
  }
});

// Error handler for this router
router.use((error, req, res, next) => {
  console.error('Signals API error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

module.exports = router; 
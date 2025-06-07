const express = require('express');
const { ApiKey, User } = require('../models');
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

// GET /api/keys - List all API keys for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const apiKeys = await ApiKey.findAll({
      where: { user_id: req.userId },
      order: [['created_at', 'DESC']]
    });

    const userKeys = apiKeys.map(key => key.toSafeJSON());

    res.json({
      keys: userKeys,
      total: userKeys.length
    });

  } catch (error) {
    console.error('Error fetching API keys:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/keys - Create a new API key
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, permissions, environment } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'API key name is required' });
    }

    // Determine key prefix based on environment
    const keyPrefix = environment === 'test' ? 'rt_test_' : 'rt_live_';
    
    // Create new API key (key will be generated automatically by the model)
    const newApiKey = await ApiKey.create({
      user_id: req.userId,
      name: name.trim(),
      key_prefix: keyPrefix,
      permissions: permissions || ['read'],
      environment: environment || 'live',
      rate_limit: environment === 'test' ? 500 : 1000
    });

    // Return the new API key (with full key visible once)
    const response = newApiKey.toSafeJSON();
    if (newApiKey.full_key) {
      response.key = newApiKey.full_key; // Full key shown only on creation
    }

    res.status(201).json({
      message: 'API key created successfully',
      key: response
    });

  } catch (error) {
    console.error('Error creating API key:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/keys/:id - Update an API key
router.put('/:id', authenticate, async (req, res) => {
  try {
    const keyId = parseInt(req.params.id);
    const { name, permissions, rateLimit } = req.body;

    const apiKey = await ApiKey.findOne({
      where: { id: keyId, user_id: req.userId }
    });

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // Update the key
    if (name) apiKey.name = name.trim();
    if (permissions) apiKey.permissions = permissions;
    if (rateLimit) apiKey.rate_limit = rateLimit;

    await apiKey.save();

    res.json({
      message: 'API key updated successfully',
      key: apiKey.toSafeJSON()
    });

  } catch (error) {
    console.error('Error updating API key:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/keys/:id - Delete an API key
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const keyId = parseInt(req.params.id);
    
    const apiKey = await ApiKey.findOne({
      where: { id: keyId, user_id: req.userId }
    });
    
    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    const keyName = apiKey.name;
    await apiKey.destroy();
    
    res.json({
      message: 'API key deleted successfully',
      deletedKey: {
        id: keyId,
        name: keyName
      }
    });

  } catch (error) {
    console.error('Error deleting API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/keys/:id/regenerate - Regenerate an API key
router.post('/:id/regenerate', authenticate, async (req, res) => {
  try {
    const keyId = parseInt(req.params.id);
    
    const apiKey = await ApiKey.findOne({
      where: { id: keyId, user_id: req.userId }
    });
    
    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // Generate new key
    const newFullKey = ApiKey.generateKey(apiKey.key_prefix);
    apiKey.key_hash = ApiKey.hashKey(newFullKey);
    apiKey.last_used = null;
    apiKey.request_count = 0;

    await apiKey.save();

    const response = apiKey.toSafeJSON();
    response.key = newFullKey; // Show full key on regeneration

    res.json({
      message: 'API key regenerated successfully',
      key: response
    });

  } catch (error) {
    console.error('Error regenerating API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/keys/:id/usage - Get usage statistics for a specific API key
router.get('/:id/usage', authenticate, async (req, res) => {
  try {
    const keyId = parseInt(req.params.id);
    
    const apiKey = await ApiKey.findOne({
      where: { id: keyId, user_id: req.userId }
    });
    
    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    // Get usage statistics from database
    const { Usage } = require('../models');
    const usageStats = await Usage.findAll({
      where: { api_key_id: keyId },
      order: [['date', 'DESC']],
      limit: 30
    });

    // Calculate totals
    const totalStats = usageStats.reduce((acc, usage) => {
      acc.totalRequests += usage.request_count;
      acc.successCount += usage.success_count;
      acc.errorCount += usage.error_count;
      acc.totalCost += parseFloat(usage.cost);
      return acc;
    }, { totalRequests: 0, successCount: 0, errorCount: 0, totalCost: 0 });

    // Get recent usage for chart data
    const dailyUsage = usageStats.slice(0, 7).reverse().map(usage => ({
      date: usage.date,
      requests: usage.request_count,
      successCount: usage.success_count,
      errorCount: usage.error_count,
      avgResponseTime: usage.avg_response_time,
      cost: parseFloat(usage.cost)
    }));

    const usageData = {
      keyId: apiKey.id,
      keyName: apiKey.name,
      totalRequests: totalStats.totalRequests,
      successRequests: totalStats.successCount,
      errorRequests: totalStats.errorCount,
      totalCost: totalStats.totalCost,
      lastUsed: apiKey.last_used,
      rateLimit: apiKey.rate_limit,
      status: apiKey.status,
      environment: apiKey.environment,
      dailyUsage,
      currentRequestCount: apiKey.request_count
    };

    res.json(usageData);

  } catch (error) {
    console.error('Error fetching API key usage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 
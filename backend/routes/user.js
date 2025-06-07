const express = require('express');
const { User } = require('../models');
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

// GET /api/user/profile - Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user.toJSON() });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, company } = req.body;
    
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    if (firstName) user.first_name = firstName;
    if (lastName) user.last_name = lastName;
    if (company !== undefined) user.company = company;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/password - Change password
router.put('/password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ 
        error: 'New password must be at least 8 characters long' 
      });
    }

    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.validatePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword; // Will be hashed by the model hook
    await user.save();

    res.json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/user/settings - Update user settings
router.put('/settings', authenticate, async (req, res) => {
  try {
    const { twoFactorEnabled, emailNotifications } = req.body;
    
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update settings
    if (typeof twoFactorEnabled === 'boolean') {
      user.two_factor_enabled = twoFactorEnabled;
    }

    // You can add more settings here as needed
    
    await user.save();

    res.json({
      message: 'Settings updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/user/usage-summary - Get user's usage summary
router.get('/usage-summary', authenticate, async (req, res) => {
  try {
    const { Usage, ApiKey } = require('../models');
    
    // Get total stats
    const totalStats = await Usage.getTotalUsageStats(req.userId);
    
    // Get API key count
    const apiKeyCount = await ApiKey.count({
      where: { user_id: req.userId, status: 'active' }
    });

    // Get current month usage
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthlyUsage = await Usage.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Usage.sequelize.Sequelize.Op.like]: `${currentMonth}%`
        }
      },
      attributes: [
        [Usage.sequelize.fn('SUM', Usage.sequelize.col('request_count')), 'monthly_requests'],
        [Usage.sequelize.fn('SUM', Usage.sequelize.col('cost')), 'monthly_cost']
      ],
      raw: true
    });

    const summary = {
      totalRequests: parseInt(totalStats.total_requests) || 0,
      totalCost: parseFloat(totalStats.total_cost) || 0,
      activeApiKeys: apiKeyCount,
      monthlyRequests: parseInt(monthlyUsage[0]?.monthly_requests) || 0,
      monthlyCost: parseFloat(monthlyUsage[0]?.monthly_cost) || 0,
      avgResponseTime: parseFloat(totalStats.overall_avg_response_time) || 0,
      successRate: totalStats.total_requests > 0 
        ? ((totalStats.total_success / totalStats.total_requests) * 100).toFixed(1)
        : 0
    };

    res.json(summary);

  } catch (error) {
    console.error('Error fetching usage summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/user/account - Delete user account
router.delete('/account', authenticate, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password confirmation required' });
    }

    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password is incorrect' });
    }

    // In a real application, you might want to:
    // 1. Soft delete by setting is_active to false
    // 2. Remove all API keys
    // 3. Clear sensitive data
    // 4. Send confirmation email
    
    user.is_active = false;
    await user.save();

    // Also deactivate all API keys
    const { ApiKey } = require('../models');
    await ApiKey.update(
      { status: 'revoked' },
      { where: { user_id: req.userId } }
    );

    res.json({ message: 'Account deletion initiated successfully' });

  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 
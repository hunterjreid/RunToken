const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const passport = require('../config/passport');
const { User } = require('../models');
const router = express.Router();

// Rate limiting for auth endpoints (relaxed for development)
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // limit each IP to 20 requests per windowMs (more generous)
  message: 'Too many attempts. Please wait 5 minutes.',
  standardHeaders: true,
  legacyHeaders: false
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { email, password, firstName, lastName, company } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      console.log(`❌ REGISTER FAILED: Missing fields`);
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['email', 'password', 'firstName', 'lastName']
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log(`❌ REGISTER FAILED: User already exists (${email})`);
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create user (password will be hashed automatically by the model)
    const newUser = await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      company: company || '',
      email_verified: false
    });

    // Generate token
    const token = generateToken(newUser.id);

    console.log(`🎉 REGISTER SUCCESS: ${firstName} ${lastName} (${email})`);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.toJSON(),
      token
    });

  } catch (error) {
    console.error('❌ REGISTER ERROR:', error.message);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log(`❌ LOGIN FAILED: Missing credentials`);
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      console.log(`❌ LOGIN FAILED: User not found (${email})`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.is_active) {
      console.log(`❌ LOGIN FAILED: Account deactivated (${email})`);
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    // Check password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      console.log(`❌ LOGIN FAILED: Wrong password (${email})`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user.id);

    console.log(`✅ LOGIN SUCCESS: ${user.first_name} ${user.last_name} (${email})`);

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });

  } catch (error) {
    console.error('❌ LOGIN ERROR:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/verify
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    res.json({
      valid: true,
      user: user.toJSON()
    });

  } catch (error) {
    res.status(401).json({ 
      valid: false,
      error: 'Invalid or expired token' 
    });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    res.json({ user: user.toJSON() });

  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    // Generate new token
    const newToken = generateToken(user.id);

    res.json({
      message: 'Token refreshed successfully',
      token: newToken,
      user: user.toJSON()
    });

  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// Google OAuth routes (only if configured)
// GET /api/auth/google - Start Google OAuth
router.get('/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({ 
      error: 'Google OAuth not configured. Please set up GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file.' 
    });
  }
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
});

// GET /api/auth/google/callback - Google OAuth callback
router.get('/google/callback', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({ 
      error: 'Google OAuth not configured' 
    });
  }
  passport.authenticate('google', { session: false })(req, res, next);
}, async (req, res) => {
    try {
      const user = req.user;
      
      // Generate JWT token
      const token = generateToken(user.id);
      
      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendURL}/auth/success?token=${token}`);
      
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendURL}/auth/error?message=OAuth failed`);
    }
  }
);

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    // For JWT-based auth, logout is mainly handled on the client side
    // You could implement token blacklisting here if needed
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/test - Simple test endpoint
router.get('/test', async (req, res) => {
  res.json({ 
    message: 'Auth API is working!',
    timestamp: new Date().toISOString(),
    googleOAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  });
});

module.exports = router; 
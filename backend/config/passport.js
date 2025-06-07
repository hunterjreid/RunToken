const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ where: { google_id: profile.id } });
    
    if (user) {
      // User exists, update last login
      await user.update({ last_login: new Date() });
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await User.findOne({ where: { email: profile.emails[0].value } });
    
    if (user) {
      // Link existing account to Google
      await user.update({
        google_id: profile.id,
        avatar_url: profile.photos[0]?.value,
        auth_provider: 'google',
        email_verified: true,
        last_login: new Date()
      });
      return done(null, user);
    }
    
    // Create new user
    user = await User.create({
      google_id: profile.id,
      email: profile.emails[0].value,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      avatar_url: profile.photos[0]?.value,
      auth_provider: 'google',
      email_verified: true,
      is_active: true,
      last_login: new Date()
    });
    
    return done(null, user);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, null);
  }
  }));
} else {
  console.log('⚠️  Google OAuth not configured - only email/password login available');
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport; 
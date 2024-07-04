const jwt = require('jsonwebtoken');

// Load env variables from .env file
require("dotenv").config();

const accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Generate an access token
const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' }); // Shorter expiration time
};

// Generate a refresh token
const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' }); // Longer expiration time
};

// Verify an access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (err) {
    return null;
  }
};

// Verify a refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshTokenSecret);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

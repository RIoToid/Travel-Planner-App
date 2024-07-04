const express = require('express');
const { verifyRefreshToken, generateAccessToken } = require('../utils/jwt');

const router = express.Router();

router.post('/refresh-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const user = verifyRefreshToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  const accessToken = generateAccessToken(user);
  return res.json({ accessToken });
});

module.exports = router;

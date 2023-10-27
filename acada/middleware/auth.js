const jwt = require('jsonwebtoken');
const config = require('../config/auth'); 

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token using your secret key
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the user data to the request for further use in controllers
    req.user = decoded.user;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

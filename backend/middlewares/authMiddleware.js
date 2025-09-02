import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    const match = authHeader.match(/^Bearer\s+(.*)$/i);
    const token = match ? match[1].trim() : null;
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set in environment');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

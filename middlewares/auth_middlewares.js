// Protects private routes with JWT verification

import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Format: Bearer token

  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Store decoded user info
    next(); // Proceed to route
  });
}

export function isAdmin(req, res, next){
  if(req.user.role !== "admin"){
    return res.status(403).json({ message: "Access denied. Admins only."});
  }
  next();
}

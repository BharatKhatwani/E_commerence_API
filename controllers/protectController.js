const jwt = require('jsonwebtoken');

const verifyToken = (req,res , next) =>{
    const authHeader = req.header.authorization;
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adds { id, email } to request
    next();
  } catch (error) {
     return res.status(403).json({ message: 'Token is invalid or expired' });
  }
}

module.exports = verifyToken;
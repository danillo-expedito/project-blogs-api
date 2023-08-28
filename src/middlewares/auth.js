const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const { JWT_SECRET } = process.env;

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

const validateToken = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) return res.status(401).json({ message: 'Token not found' });

    const token = extractToken(bearerToken);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { data: { userId } } = decoded;

        const userHasAccess = await UserService.getById(userId);

        if (!userHasAccess) return res.status(401).json({ message: 'Expired or invalid token' });

        req.user = { userId };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = validateToken;
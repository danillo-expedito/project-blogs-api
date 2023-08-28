const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const login = async (id) => {
        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
    
        const token = jwt.sign({ data: { userId: id } }, JWT_SECRET, jwtConfig);
    
        return { token };
};

module.exports = {
    login,
};
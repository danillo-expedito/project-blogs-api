const jwt = require('jsonwebtoken');
const { UserService } = require('../services');
const { validateUserFields } = require('../utils/validateUserFields');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
        const userReq = req.body;
        const { email, password } = userReq;
    
        if (!validateUserFields(email, password)) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
    
        const user = await UserService.getByEmail(email);
    
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
    
        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
    
        const token = jwt.sign({ data: { userId: user.id } }, JWT_SECRET, jwtConfig);
    
        return res.status(200).json({ token });
};

module.exports = {
    login,
};
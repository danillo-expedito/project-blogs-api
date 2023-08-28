const { UserService } = require('../services');
const { validateNewUser, validateUserFields } = require('../utils/validateCredentials');
const { login } = require('./login');

const createUser = async (req, res) => {
    const { error } = validateNewUser(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { displayName, email, password, image } = req.body;
    
    const userExists = await UserService.getByEmail(email);
    if (userExists) return res.status(409).json({ message: 'User already registered' });

    const newUser = await UserService.create(displayName, email, password, image);
    const { token } = await login(newUser.id);
    return res.status(201).json({ token });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!validateUserFields(email, password)) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getByEmail(email);
    
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    const { token } = await login(user.id);
    return res.status(200).json({ token });
};

module.exports = {
    createUser,
    userLogin,
};
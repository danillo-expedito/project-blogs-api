const { User } = require('../models');

const getByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    return user;
};

const create = async (displayName, email, password, image) => {
    const newUser = await User.create({ displayName, email, password, image });

    return newUser;
};

module.exports = {
    getByEmail,
    create,
};
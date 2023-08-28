const { User } = require('../models');

const getByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    return user;
};

module.exports = {
    getByEmail,
};
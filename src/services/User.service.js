const { User } = require('../models');

const getByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    return user;
};

const getById = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });

    if (!user) return null;

    return user;
};

const getAll = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });

    return users;
};

const create = async (displayName, email, password, image) => {
    const newUser = await User.create({ displayName, email, password, image });

    return newUser;
};

const exclude = async (userId) => {
    await User.destroy({ where: { id: userId } });
};

module.exports = {
    getByEmail,
    getById,
    getAll,
    create,
    exclude,
};
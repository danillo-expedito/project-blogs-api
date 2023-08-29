const route = require('express').Router();
const { UserController } = require('../controllers');
const validateToken = require('../middlewares/auth');

route.post('/', UserController.createUser);

route.get('/', validateToken, UserController.getAllUsers);

route.get('/:id', validateToken, UserController.getById);

route.delete('/me', validateToken, UserController.deleteUser);

module.exports = route;
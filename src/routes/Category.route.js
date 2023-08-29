const route = require('express').Router();
const { CategoryController } = require('../controllers');
const validateToken = require('../middlewares/auth');

route.post('/', validateToken, CategoryController.createCategory);

route.get('/', validateToken, CategoryController.getAllCategories);

module.exports = route;
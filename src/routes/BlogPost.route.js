const route = require('express').Router();
const { BlogPostController } = require('../controllers');
const validateToken = require('../middlewares/auth');

route.post('/', validateToken, BlogPostController.createBlogPost);

route.get('/', validateToken, BlogPostController.getAllBlogPosts);

route.get('/search', validateToken, BlogPostController.searchBlogPosts);

route.get('/:id', validateToken, BlogPostController.getBlogPostById);

route.put('/:id', validateToken, BlogPostController.updateBlogPost);

route.delete('/:id', validateToken, BlogPostController.deleteBlogPost);

module.exports = route;
const express = require('express');
const { UserController, CategoryController, BlogPostController } = require('./controllers');
const validateToken = require('./middlewares/auth');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', UserController.userLogin);

app.post('/user', UserController.createUser);

app.get('/user', validateToken, UserController.getAllUsers);

app.get('/user/:id', validateToken, UserController.getById);

app.post('/categories', validateToken, CategoryController.createCategory);

app.get('/categories', validateToken, CategoryController.getAllCategories);

app.post('/post', validateToken, BlogPostController.createBlogPost);

app.get('/post', validateToken, BlogPostController.getAllBlogPosts);

app.get('/post/:id', validateToken, BlogPostController.getBlogPostById);

app.put('/post/:id', validateToken, BlogPostController.updateBlogPost);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

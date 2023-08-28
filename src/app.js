const express = require('express');
const { UserController } = require('./controllers');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', UserController.userLogin);
app.post('/user', UserController.createUser);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

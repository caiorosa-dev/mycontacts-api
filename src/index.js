const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.get('/', (request, response) => {
  response.status(200).json({ Hello: 'World' });
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

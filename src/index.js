const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const errorHandler = require('./app/middlewares/errorHandler');
const cors = require('./app/middlewares/cors');

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.get('/', (request, response) => {
  response.status(200).json({ Hello: 'World' });
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

app.use(routes);


module.exports = app;
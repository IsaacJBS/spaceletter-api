const express = require('express');
const routes = express();
const { registerEmail } = require('./controllers/email')

routes.post('/', registerEmail);

module.exports = routes;
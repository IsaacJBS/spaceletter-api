const express = require('express');
const routes = express();
const { registerEmail } = require('./controllers/email');
const { registerAdmin } = require('./controllers/registerAdmin')

routes.post('/', registerEmail);

routes.post('/admin', registerAdmin);

module.exports = routes;
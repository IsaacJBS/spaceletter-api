const express = require('express');
const routes = express();
const { registerEmail } = require('./controllers/email');
const { loginAdmin } = require('./controllers/loginAdmin');
const { registerAdmin } = require('./controllers/registerAdmin')

routes.post('/', registerEmail);

routes.post('/admin', registerAdmin);

routes.post('/admin/login', loginAdmin);

module.exports = routes;
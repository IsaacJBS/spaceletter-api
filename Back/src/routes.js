const express = require('express');
const routes = express();
const { registerEmail } = require('./controllers/email');
const { loginAdmin } = require('./controllers/loginAdmin');
const { registerAdmin } = require('./controllers/registerAdmin');
const { verifyToken } = require('./middleware/verifyToken');

routes.use(verifyToken);
routes.post('/', registerEmail);

routes.post('/admin', registerAdmin);

routes.post('/admin/login', loginAdmin);




module.exports = routes;
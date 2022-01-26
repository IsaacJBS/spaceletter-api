const express = require('express');
const routes = express();
const { registerEmail } = require('./controllers/email');
const { loginAdmin } = require('./controllers/loginAdmin');
const { registerAdmin } = require('./controllers/registerAdmin');
const { sendTextOfNewsletter } = require('./controllers/sendText');
const { verifyToken } = require('./middleware/verifyToken');

routes.post('/', registerEmail);

routes.post('/admin', registerAdmin);

routes.post('/admin/login', loginAdmin);

routes.use(verifyToken);

routes.post('/admin/send', sendTextOfNewsletter);





module.exports = routes;
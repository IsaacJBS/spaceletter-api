const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    secure: false,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
    }
});

transport.use('compile', handlebars({
    viewEngine: {
        extname: '.handlebars',
        defaultLayout: false
    },
    viewPath: './views/'
}));

module.exports = transport;
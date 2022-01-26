const express = require('express');
const routes = express();

routes.get('/', async (req, res) => {
    res.json({ mensagem: 'oi' })
})

module.exports = routes;
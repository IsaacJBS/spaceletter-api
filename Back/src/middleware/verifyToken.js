const connection = require('../connection');
const jwt = require('jsonwebtoken');
const { validationToken } = require('../models/validationsYup');
require('dotenv').config();

const verifyToken = async (req, res) => {
    const { authorization } = req.headers;

    try {
        await validationToken.validate(req.headers);
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const query = 'select * from login where id = $1';
        const { rows, rowCount } = await connection.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        console.log(rows);

        const { senha, ...usuario } = rows[0];

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
}

module.exports = { verifyToken };
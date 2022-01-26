const { validationAdmin } = require('../models/validationsYup');
const bcrypt = require('bcrypt');
const connection = require('../connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        await validationAdmin.validate(req.body);

        const queryVerifyEmail = 'select * from login where email = $1';
        const { rows, rowCount } = await connection.query(queryVerifyEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const user = rows[0];
        console.log(user)

        const verifiedPassword = await bcrypt.compare(password, user.password);

        if (!verifiedPassword) {
            return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(202).json({ token: token })
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { loginAdmin }
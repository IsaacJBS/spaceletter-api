const connection = require('../connection');
const { validationEmail } = require('../models/validationsYup');

const registerEmail = async (req, res) => {
    const { email } = req.body;

    try {
        await validationEmail.validate(req.body);

        const queryConsultEmail = 'SELECT * FROM emails where email = $1';
        const { rowCount: consultedEmail } = await connection.query(queryConsultEmail, [email]);

        if (consultedEmail > 0) {
            res.status(404).json('Email já cadastrado');
        }

        const queryRegisterEmail = 'INSERT INTO emails (email) values ($1)';
        const registeringEmail = await connection.query(queryRegisterEmail, [email]);

        if (registeringEmail.rowCount === 0) {
            res.status(400).json('Não foi possível cadastrar o e-mail')
        }

        return res.status(204).json('E-mail cadastrado com sucesso')
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { registerEmail };
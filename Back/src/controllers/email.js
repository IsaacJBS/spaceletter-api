const connection = require('../connection');
const { validationEmail } = require('../models/validationsYup');
const nodemailer = require('../nodemailer');


const registerEmail = async (req, res) => {
    const { email } = req.body;

    try {
        await validationEmail.validate(req.body);

        const queryConsultEmail = 'SELECT * FROM emails where email = $1';
        const { rowCount: consultedEmail } = await connection.query(queryConsultEmail, [email]);

        if (consultedEmail > 0) {
            return res.status(404).json('Email já cadastrado');
        }

        const queryRegisterEmail = 'INSERT INTO emails (email) values ($1)';
        const registeringEmail = await connection.query(queryRegisterEmail, [email]);

        if (registeringEmail.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o e-mail')
        }

        nodemailer.sendMail({
            from: 'naoresponder@newsletter.com',
            to: email,
            subject: "Newsletter",
            template: 'welcome',
            context: {
                email
            }
        })

        return res.status(200).json('Cadastrado com sucesso')
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

module.exports = { registerEmail };
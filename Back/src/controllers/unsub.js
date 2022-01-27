const { validationEmail } = require('../models/validationsYup');
const connection = require('../connection');

const unsub = async (req, res) => {
    const { email } = req.body;

    try {
        await validationEmail.validate(req.body);

        const querySearchEmail = 'SELECT * FROM emails WHERE email = $1';
        const searchingEmail = await connection.query(querySearchEmail, [email])

        if (searchingEmail.rowCount === 0) {
            return res.status(404).json(`Não foi encontrado o email: ${email} no banco de dados`)
        }

        const queryDeleteEmail = 'DELETE FROM emails WHERE email = $1';
        const deletingEmail = await connection.query(queryDeleteEmail, [email]);

        if (deletingEmail.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o e-mail');
        }

        return res.status(204).json('E-mail descadastrado com sucesso');
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { unsub };
const { validationText } = require('../models/validationsYup');
const connection = require('../connection');

const sendTextOfNewsletter = async (req, res) => {
    const { title, text } = req.body;

    try {
        await validationText.validate(req.body);

        const queryInsertText = 'INSERT INTO newsletter_texts (title, text) values ($1, $2)';
        const insertingIntoNewsletter = await connection.query(queryInsertText, [title, text]);

        if (insertingIntoNewsletter.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o texto');
        }

        return res.status(204).json('Newsletter enviada com sucesso');
    } catch (error) {
        return res.status(404).json(error.message);
    }
}

module.exports = { sendTextOfNewsletter }
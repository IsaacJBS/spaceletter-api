const express = require('express');
const { validationAdmin } = require('../models/validationsYup');
const bcrypt = require('bcrypt');
const connection = require('../connection');

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        await validationAdmin.validate(req.body);

        const queryConsultEmail = 'SELECT * FROM login where email = $1';
        const { rowCount: consultedEmail } = await connection.query(queryConsultEmail, [email]);

        if (consultedEmail > 0) {
            res.status(404).json('Email já cadastrado');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const queryInsertIntoAdmin = 'INSERT INTO login (email, password) values ($1, $2)';
        const registeringAdmin = await connection.query(queryInsertIntoAdmin, [email, encryptedPassword]);

        if (registeringAdmin.rowCount === 0) {
            return res.status(400).json("Não foi possível cadastrar o admin");
        }

        return res.status(201).json('Admin cadastrado');
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = { registerAdmin }
const yup = require('./configurationYup');

const validationEmail = yup.object().shape({
    email: yup.string().required().email()
});

const validationAdmin = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
});

const validationToken = yup.object().shape({
    authorization: yup.string().required()
});

const validationText = yup.object().shape({
    title: yup.string().required(),
    text: yup.string().required()
})

module.exports = {
    validationEmail,
    validationAdmin,
    validationToken,
    validationText
}
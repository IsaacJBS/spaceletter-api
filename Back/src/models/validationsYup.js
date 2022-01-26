const yup = require('./configurationYup');

const validationEmail = yup.object().shape({
    email: yup.string().required().email()
})

const validationAdmin = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})
module.exports = {
    validationEmail,
    validationAdmin
}
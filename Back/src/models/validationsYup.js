const yup = require('./configurationYup');

const validationEmail = yup.object().shape({
    email: yup.string().required().email()
})

module.exports = {
    validationEmail
}
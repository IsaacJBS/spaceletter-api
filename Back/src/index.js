const app = require('./server');
const port = 5000;

app.listen(process.env.PORT || port, () => {
    console.log(`Api iniciou na porta ${port}`)
})
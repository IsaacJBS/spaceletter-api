const app = require('./server');
const port = 8004;

app.listen(port, () => {
    console.log(`Api iniciou na porta ${port}`)
})
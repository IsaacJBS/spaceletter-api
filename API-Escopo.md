# Newsletter API



### POST - CADASTRO DE E-MAIL

- E-mail unique key
- Verificar se já existe e-mail cadastrado
- Cadastrar no banco de dados
- Retornar status 204 e json({'E-mail cadastrado'})



### POST - Cadastro de ADMIN

- E-mail unique key
- Encriptar a senha antes de salvar no banco
- Retornar status



### POST - Login de ADMIN

- Verificar senha e email no banco de dados
- retornar um token



### POST - Envio da newsletter

- Receber no body o título e texto do artigo
- Enviar via nodemailer a newsletter
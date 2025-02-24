require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const appMessage = `Server running on port ${port}`;

app.use(express.json);

// Middleware -> pode ser usado na autenticação, validação, etc

// Controllers -> é a lógica da rota, basicamente oq tá em {} ali no app.get

// Tem algumas outras pastas e boas práticas mas vou te passando depois, tô pegando o ritmo dnv aqui.

app.listen(port, ()=>{
    console.log(appMessage)
});

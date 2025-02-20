const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) =>{
    response.send("Test"); // testando uai
    response.sendStatus(200); // 200 de ok
})

// Middleware -> pode ser usado na autenticação, validação, etc

// Controllers -> é a lógica da rota, basicamente oq tá em {} ali no app.get

// Tem algumas outras pastas e boas práticas mas vou te passando depois, tô pegando o ritmo dnv aqui.
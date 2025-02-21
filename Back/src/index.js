require("dotenv").config();
const express = require("express");
const app = express();
const appMessage = `Server running on port ${process.env.PORT}`;

// Middleware -> pode ser usado na autenticação, validação, etc

// Controllers -> é a lógica da rota, basicamente oq tá em {} ali no app.get

// Tem algumas outras pastas e boas práticas mas vou te passando depois, tô pegando o ritmo dnv aqui.
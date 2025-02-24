const express = require("express");
const app = express();

app.get("/", (_request, response) =>{
    response.send("Test"); // testando uai
    response.sendStatus(200); // 200 de ok
})
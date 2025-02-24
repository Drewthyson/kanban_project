const express = require("express");
const router = express.Router({mergeParams: true});

router.get("/", (_req, res) => {
    res.send.json("Arquivos");
});

router.get("/teste", (_req, res) =>{
    res.send.json("Teste");
}) 

module.exports = router;
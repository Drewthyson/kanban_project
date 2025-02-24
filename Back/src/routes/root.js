const express = require("express");
const router = express.Router({mergeParams: true});
const arquivos = require("./arquivos/index.js");

router.use("/", arquivos);

module.exports = router;

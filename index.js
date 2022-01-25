const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    var nome = "Danilo Loose";
    var lang = "Javascript";
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Digibee"
    });
});

app.listen(8080, () => {
    console.log("server online...");
});
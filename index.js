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


app.get("/:nome/:lang", (req, res) => {

    var produtos = [
        {
            nome: "doritos",
            preco: 12.00
        }, {
            nome: "ruffles",
            preco: 8.00
        }, {
            nome: "fandangos",
            preco: 4.00
        }
    ]

    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;
    res.render("index", {
        nome: nome,
        lang: lang,
        produtos, produtos,
        exibirMsg: exibirMsg
    });
});

app.listen(8080, () => {
    console.log("server online...");
});
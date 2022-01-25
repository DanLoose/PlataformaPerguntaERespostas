const express = require("express");
const body_parser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//BODY-PARSER
app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());

app.get("/", (req, res) => {
    res.render("index");
});


//ROUTES
app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/save-question", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(`titulo: ${titulo} descrição: ${descricao}`);
});


//PORT
app.listen(8080, () => {
    console.log("server online...");
});
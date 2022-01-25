const express = require("express");
const body_parser = require("body-parser");
const app = express();

const Questions = require("./database/Questions");
const connection = require("./database/database");

//  DATABASE   
connection
    .authenticate().then(() => {
        console.log("conexão feita com o banco de dados");
    }).catch(error => {
        console.log(error);
    })

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
    Questions.create({
        title: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/");
    });
});


//PORT
app.listen(8080, () => {
    console.log("server online...");
});
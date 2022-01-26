const express = require("express");
const body_parser = require("body-parser");
const app = express();

const Answers = require("./database/Answers");
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

//ROUTES
app.get("/", (req, res) => {
    Questions.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        res.render("index", {
            questions: questions
        });
    });
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Questions.findOne({
        where: {
            id: id
        }
    }).then((question) => {
        if (question) {

            Answers.findAll({
                raw: true,
                where: {
                    answerId: question.id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then((answers) => {
                res.render("question", {
                    question: question,
                    answers: answers
                });
            });

        } else {
            res.redirect("/");
        }
    });
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/save-answer", (req, res) => {
    var resposta = req.body.answer;
    var id = req.body.id;
    if (id && resposta) {
        Answers.create({
            body: resposta,
            answerId: id
        }).then(() => {
            res.redirect(`/question/${id}`);
        });
    } else {
        res.redirect("/");
    }
});

app.post("/save-question", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    if (titulo && descricao) {
        Questions.create({
            title: titulo,
            description: descricao
        }).then(() => {
            res.redirect("/");
        });
    } else {
        res.redirect("/")
    }
});


//PORT
app.listen(8080, () => {
    console.log("server online...");
});
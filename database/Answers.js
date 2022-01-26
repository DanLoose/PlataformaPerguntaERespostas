const Sequelize = require("sequelize");
const connection = require("./database");

const Answers = connection.define("answers", {
    body: {
        allowNull: false,
        type: Sequelize.TEXT
    },
    answerId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

Answers.sync({
    force: false
}).then(() => {
    console.log("table of answers created!");
})

module.exports = Answers;
const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', 'MAscarenhas..123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
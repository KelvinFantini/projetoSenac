const Sequelize = require("sequelize")

const sequelize = new Sequelize('projeto1', 'root', '',{
    host: 'localhost',
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize 
}

//Aqui está conectando ao banco de dados "projeto1" utilizando a framework sequelize!
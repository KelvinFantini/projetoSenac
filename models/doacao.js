const db  = require('./db')

const usuario = require('./usuario')

const doacaos = db.sequelize.define('doacaos',{
    nome : {
        type:db.Sequelize.STRING
    },
    foto: {
        type:db.Sequelize.STRING
    },
    descricao: {
        type:db.Sequelize.STRING
    },
    titulo: {
        type:db.Sequelize.STRING
    },
    pedido1: {
        type:db.Sequelize.STRING
    },
    quantidade1: {
        type:db.Sequelize.STRING
    },
    prioridade1: {
        type:db.Sequelize.STRING
    },
    medida1: {
        type:db.Sequelize.STRING
    },
    pedido2: {
        type:db.Sequelize.STRING
    },
    quantidade2: {
        type:db.Sequelize.STRING
    },
    prioridade2: {
        type:db.Sequelize.STRING
    },
    medida2: {
        type:db.Sequelize.STRING
    },
    pedido3: {
        type:db.Sequelize.STRING
    },
    quantidade3: {
        type:db.Sequelize.STRING
    },
    prioridade3: {
        type:db.Sequelize.STRING
    },
    medida3: {
        type:db.Sequelize.STRING
    },
    pedido4: {
        type:db.Sequelize.STRING
    },
    quantidade4: {
        type:db.Sequelize.STRING
    },
    prioridade4: {
        type:db.Sequelize.STRING
    },
    medida4: {
        type:db.Sequelize.STRING
    },
    email_doador: {
        type:db.Sequelize.STRING
    }

})

//Cria tabela - somente uma vez
//doacaos.sync({force:true})

module.exports = doacaos




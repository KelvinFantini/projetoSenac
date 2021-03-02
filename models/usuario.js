const db  = require('./db')

const usuario = db.sequelize.define('usuario',{
    nome : {
        type:db.Sequelize.STRING
    },
    senha: {
        type:db.Sequelize.STRING
    },
    email: {
        type:db.Sequelize.STRING
    },
    endereco: {
        type:db.Sequelize.STRING
    },
    complemento: {
        type:db.Sequelize.STRING
    },
    cidade: {
        type:db.Sequelize.STRING
    },
    estado: {
        type:db.Sequelize.STRING
    },
    cep: {
        type:db.Sequelize.STRING
    },
    tipo: {
        type:db.Sequelize.STRING
    },
    cnpj: {
        type:db.Sequelize.STRING
    }
})

//Cria tabela - somente uma vez
//usuario.sync({force:true})

module.exports = usuario
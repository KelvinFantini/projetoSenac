const db  = require('./db')

const ongs = db.sequelize.define('ongs',{
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
    }
})

//Cria tabela - somente uma vez
//ongs.sync({force:true})

module.exports = ongs
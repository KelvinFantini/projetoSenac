const db  = require('./db')

const usuario = db.sequelize.define('usuarios',{
    nome : {
        type:db.Sequelize.STRING
    },
    senha: {
        type:db.Sequelize.STRING
    },
    email: {
        type:db.Sequelize.STRING
    }  
})

//Cria tabela - somente uma vez
//usuario.sync({force:true})

module.exports = usuario


//Aqui está a conexão com a tabela 'Usuario' do banco de dados "projeto1"!
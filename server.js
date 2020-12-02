    const usuario = require("./models/usuario")

    const express = require("express")
    const app = express()

    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")

    //Configurando o handlebars 

    app.engine('handlebars', handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')

    //Configurar o motor de template handlebars

    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use('/static', express.static(__dirname + '/public'));

    app.listen(3000);

    //Esse bloco dispara e envia o formulario     

    app.post('/cadUsuario', function(req,res){
        usuario.create({
            nome:req.body.nome,
            senha:req.body.senha,
            email:req.body.email,
            endereco:req.body.endereco,
            complemento:req.body.complemento,
            cidade:req.body.cidade,
            estado:req.body.estado,
            cep:req.body.cep
        }).then(function(){
            res.render("index")
        }).catch(function(erro){
            res.send("Erro "+erro)
        })
    })

    //Aqui estão todas as rotas do site 

    app.get('/',function(req,res){
        res.render("index")
    })

    app.get('/quemsomos',function(req,res){
        res.render("quemsomos")
    })

    app.get('/cadastro', function(req,res){
        res.render("cadastro")
    })
     
    app.get('/login',function(req,res){
        res.render("login")
    })

    app.get('/formulario',function(req,res){
        res.render("formulario")
    })

    app.get('/caminhos', function(req,res){
        res.render("caminhos")
    })
    

    

       
    
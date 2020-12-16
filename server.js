    const usuario = require("./models/usuario")
    const ongs = require("./models/ongs")

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

    

    //Esse bloco dispara e envia o formulario     

    app.post('/cadUsuario', function(req,res){
        usuario.create({
            nome:req.body.nome,
            senha:req.body.senha,
            email:req.body.email,
        }).then(function(){
            res.render("index")
        }).catch(function(erro){
            res.send("Erro "+erro)
        })
    })


    app.post('/cadUsuario1', function(req,res){
        usuario.create({
            nome:req.body.nome,
            senha:req.body.senha,
            email:req.body.email,
        }).then(function(){
            usuario.findAll().then (function(doadores){
            res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
             
        }).catch(function(erro){
            res.send("Erro "+erro)
        })
        //Esta rota é reponsável pela ação do formulário da página "formulario" para realizar cadastros!
        //Conecta-se a base de dados do usuário.
    })


    app.post('/cadOng', function(req,res){
        ongs.create({
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
        //catch significa que se deu errado ele mostra o erro
        //then significa que se executou o que era pra fazer anteriormente ele executa mais o .then
    })

    //Aqui estão todas as rotas do E xpress 

    app.get('/',function(req,res){
        res.render("index")
        //Aqui está renderizando a página inicial do site!
    })

    app.get('/quemsomos',function(req,res){
        res.render("quemsomos")
        //Aqui renderiza a página quem somos!
    })

    app.get('/cadastro', function(req,res){
        res.render("cadastro")
        //Aqui renderiza a página de cadastro tanto de pessoa jurídica quanto física!
    })
     
    app.get('/login',function(req,res){
        usuario.findAll().then(function(doadores){
            res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
        })
        //Nesta rota renderiza a página de login do site
    })

    app.get('/formPedido', function(req,res){
        res.render("formDoacao")
        //Esta rota é reponsável pela página onde as ONGs cadastram a doação que precisam!
    })



    //Aqui está a porta na qual está rodando o servidor

    app.get('/delete/:id', function(req,res){
        usuario.destroy({
            where:{'id' : req.params.id}
        }).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }).catch(function(){res.send("Não deu certo")})
    });

    app.get('/update/:id', function(req,res){
        usuario.findAll({where:{'id' : req.params.id}}).then(function(doadores){
            res.render("atualiza",{doador:doadores.map(pagamento => pagamento.toJSON())})  
        })
    })

    app.post('/updateUsuario', function(req,res){
        usuario.update({
            nome:req.body.nome,
            senha:req.body.senha},
            {where:{id:req.body.codigo}}).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }).catch(function(erro){
            res.send("Erro "+erro)})
    });
        //catch significa que se deu errado ele mostra o erro
        //then significa que se executou o que era pra fazer anteriormente ele executa mais o .then

    app.listen(3000);

    

       
    
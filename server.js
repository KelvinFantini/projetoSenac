    const usuario = require("./models/usuario")

    const doacao = require("./models/doacao")

    const multer = require('multer')

    const express = require("express")
    const app = express()

    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")

    //Configurando o nodemailer para enviar email

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "testekelvin1@gmail.com",
            pass: "35820058a"
        },
        tls: { rejectUnauthorized: false}
    });

    const mailOptions = {
        from: "testekelvin1@gmail.com",
        to: "",
        subject: "Email enviado pelo node",
        text: "Bem difícil né??"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else {
            console.log('Email enviado: ' + info.response)
        }
    });
    // Fim das configurações do nodemailer

    //Configurando o handlebars 

    app.engine('handlebars', handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')

    //Fim

    //Configurando o body-parser e a rota estática para pegar coisas na máquina

    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use('/static', express.static(__dirname + '/public'));
    //Fim

    //Configurando o multer pra fazer upload de imagem na pasta img1

    const storage = multer.diskStorage({
        destination:(req,file,cb) =>{cb(null,'public/img1')},
        filename:(req,file,cb) => {cb(null,file.originalname)}
    })

    const upload = multer({storage})
    //Fim

    //Configurando o express-session/ sessão

    var session = require('express-session'); //Chamada ao express-session

    
    app.use(session({
        secret: 'secret',
        resave: true,   
        saveUninitialized: true
    }));
    //Fim

    // Este bloco dispara o fomulario de login

    app.get('/login', function(req,res){
        usuario.findAll().then(function(doadores){
            res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
        })
        
        //Aqui está a rota para Login desenvolvida dia 26-01-21
    })
    app.get('/caminhos', function(req,res){
        res.render('caminhos')
        //Aqui está a rota para Login desenvolvida dia 26-01-21
    })


    /*Esta rota esta fazendo o login do site, ele vai até o banco de dados, conta quantos registros tem no BD, e se 
    for superior a um ele entra na sentença. Ele ve que há um dado igual aquele no banco.*/

    app.post('/login1', function(req,res){
        req.session.email = req.body.email;
        req.session.senha = req.body.senha;
       
        usuario.count({where: [{email: req.session.email} , {senha: req.session.senha} ]}).then(function(dados){
            if(dados >= 1  ){
                res.render("caminhos")
            }else{
                res.render('cadastro')
            }
        })
    })
   
    
    app.get('/sair', function(req,res){
        req.session.destroy(function(){
            res.render("formulario")
        })
            
        //Aqui destrói a sessão criada após fazer login.
    })

    //Esse bloco dispara e envia o formulario de cadastro de usuários do sistema!  

    app.post('/cadastroUser', function(req,res){
        usuario.create({
            nome:req.body.nome,
            senha:req.body.senha,
            email:req.body.email,
            endereco:req.body.endereco,
            complemento:req.body.complemento,
            cidade:req.body.cidade,
            estado:req.body.estado, 
            cep:req.body.cep,
            tipo:req.body.tipo,
            cnpj:req.body.cnpj
        }).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }).catch(function(erro){
            res.send("Erro "+erro)
        })

        //catch significa que se deu errado ele mostra o erro
        //then significa que se executou o que era pra fazer anteriormente ele executa mais o .then
    })

    
    //Rota do formulário de doação!
    

    app.post('/cadastroDoacao', upload.single('foto'), function(req,res){
        console.log(req.file.originalname)
        doacao.create({
            nome:req.body.nome,
            titulo:req.body.titulo,
            descricao:req.body.descricao,
            foto:req.file.originalname,
            pedido1:req.body.pedido1,
            quantidade1:req.body.quantidade1,
            prioridade1:req.body.prioridade1,
            medida1:req.body.medida1,
            pedido2:req.body.pedido2,
            quantidade2:req.body.quantidade2,
            prioridade2:req.body.prioridade2,
            medida2:req.body.medida2,
            pedido3:req.body.pedido3,
            quantidade3:req.body.quantidade3,
            prioridade3:req.body.prioridade3,
            medida3:req.body.medida3,
            pedido4:req.body.pedido4,
            quantidade4:req.body.quantidade4,
            prioridade4:req.body.prioridade4,
            medida4:req.body.medida4,
            email_doador:req.body.email_doador
        }).then(function(){
            usuario.findAll({where: {'email': req.session.email}}).then(function(doadores){
                res.render("caminhos",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }).catch(function(erro){
            res.send("Erro "+erro)
        })
        //catch significa que se deu errado ele mostra o erro
        //then significa que se executou o que era pra fazer anteriormente ele executa mais o .then
    })
     

    app.get('/inicio',function(req,res){   
        doacao.findAll().then(function(doacoess){
            res.render("index",{doadores11:doacoess.map(pagamento11 => pagamento11.toJSON())})
            
        })
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
     

    app.get('/login/formPedido', function(req,res){
        if(req.session.email){
            usuario.findAll({where:{'email' : req.session.email}}).then(function(doadores){
                res.render("formDoacao",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }else{
            res.render("formulario")
        }
        //Esta rota é reponsável pela página onde as ONGs cadastram a doação que precisam!
    })
    
    app.get('/delete1/:id', function(req,res){
        doacao.destroy({
            where:{'id' : req.params.id}
        }).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })//Deleção de usuário
        }).catch(function(error){res.send(error + "Não deu certo")})
    });


    app.post('/delete', function(req,res){
        usuario.destroy({
            where:{'id' : req.body.id}
        }).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })//Deleção de usuário
        }).catch(function(error){res.send(error + "Não deu certo")})
    });

    app.get('/update/:id', function(req,res){
        usuario.findAll({where:{ 'email' : req.session.email}}).then(function(doadores){
            res.render("atualiza",{doador:doadores.map(pagamento => pagamento.toJSON())})  
        }) //Update de usuario, referente a todos os dados 
    })

    app.post('/updateUsuario', function(req,res){
        usuario.update({
            nome:req.body.nome,
            senha:req.body.senha},
            {where:{id:req.body.id}}).then(function(){
            usuario.findAll().then(function(doadores){
                res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
            })
        }).catch(function(erro){
            res.send("Erro "+erro)})
    });
        //catch significa que se deu errado ele mostra o erro
        //then significa que se executou o que era pra fazer anteriormente ele executa mais o .then
    

    app.get('/update1/:id', function(req,res){
        doacao.findAll({where:{ 'email_doador' : req.session.email}}).then(function(doacoess){
            res.render("modificarDoacao",{doadores11:doacoess.map(pagamento11 => pagamento11.toJSON())})
            
        }) //Update de doação e de todos os campos do formulário de doação 
    });

    app.post('/updateDoacao1', function(req,res){
        doacao.update({
            nome:req.body.nome,
            titulo:req.body.titulo,
            descricao:req.body.descricao,
            foto:req.body.foto,
            pedido1:req.body.pedido1,
            quantidade1:req.body.quantidade1,
            prioridade1:req.body.prioridade1,
            medida1:req.body.medida1,
            pedido2:req.body.pedido2,
            quantidade2:req.body.quantidade2,
            prioridade2:req.body.prioridade2,
            medida2:req.body.medida2,
            pedido3:req.body.pedido3,
            quantidade3:req.body.quantidade3,
            prioridade3:req.body.prioridade3,
            medida3:req.body.medida3,
            pedido4:req.body.pedido4,
            quantidade4:req.body.quantidade4,
            prioridade4:req.body.prioridade4,
            medida4:req.body.medida4
            }
            ).then(function(){
             doacao.findAll({where:{'email_daodor':req.session.email}}).then(function(doacoess){
                res.render("baixa_doacao",{doadores11:doacoess.map(pagamento11 => pagamento11.toJSON())})
            })//Rota de gravação do update no BD
        }).catch(function(erro){
            res.send("Erro "+erro)})
    });

    app.get('/login/baixaDoacao',function(req,res){
    if(req.session.email){
        doacao.findAll().then(function(doacoess){
            res.render("baixa_doacao",{doadores11:doacoess.map(pagamento11 => pagamento11.toJSON())})
        })
        //Nesta rota renderiza a página de login do site
    }else {
        res.render("formulario")
    }
    });
    
    

    //Aqui está a porta na qual está rodando o servidor

    app.listen(3000);


    /*
    Estrutura condicional que está criando uma sessão, e fazendo o requerimento da interface através do req.body e comparando
    com os valores fixos!

    app.use('/login1', function(req,res){
        req.session.nome = 'andre';
        req.session.senha = 'repolho123'

        if(req.session.nome == req.body.nome && req.body.senha == 'repolho123'){
            res.send("Usuário logado")
        }else{
            res.send("Acesso Negado")
        }
    });


    
    app.get('/login1',function(req,res){
        usuario.findAll().then(function(doadores){
            res.render("formulario",{doador:doadores.map(pagamento => pagamento.toJSON())})
        })
        //Nesta rota renderiza a página de login do site
    })
    */

    /*app.get('/login/caminhos', function(req,res){
        if(req.session.nome){
            res.render("caminhos")   
        }else{
            res.render('formulario')
        }
        // Após fazer o login, está disposta está página para direcionar as opções de quem está cadastrado!
    })*/ 
    


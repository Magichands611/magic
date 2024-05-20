const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const bodyParser = require('body-parser')
const app = express();
const conn = require("./db/conn");
const moment = require('moment')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')
const { BiUpArrowCircle } = require('react-icons/bi')
const tblclientes = require('./models/tblclientes')
const tblagenda = require('./models/tblagenda')
const { raw } = require('mysql2')


// HANDLEBARS
app.engine("handlebars", exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    formatDate: (date) => {
      return moment(date).format("DD/MM/YYYY")
    }
  }  
}))

app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// SESSION
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// FLASH MESSAGES
app.use(flash());

// STATIC
app.use(express.static("public"));

// SET SESSION TO RES
app.use((req, res, next) => {
    console.log(req.session.userid);
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

app.get('/', function(req, res){
  res.render("home")
});

app.get('/services', function(req, res){
  res.render("services")
});

app.get('/client', function(req, res){
  res.render("client")
});

app.post('/client/insert', function(req, res){
    const cliente = {
      cpf: req.body.cpf,
      nome: req.body.nome,
      idade: req.body.idade,
      contato: req.body.contato,
      end: req.body.end,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      queixa: req.body.queixa,
      trombose: req.body.trombose,
      hipotenso: req.body.hipotenso,
      hipertenso: req.body.hipertenso,
      tontura: req.body.tontura,
      diabetico: req.body.diabetico,
      alimentou: req.body.alimentou,
      atividade: req.body.atividade,
      fumante: req.body.fumante,
      ciclo: req.body.ciclo,
      osteoporose: req.body.osteoporose,
      infeccao: req.body.infeccao,
      marcapasso: req.body.marcapasso,
      protese: req.body.protese,
      lesoes: req.body.lesoes,
      botox: req.body.botox,
      cirurgia: req.body.cirurgia,
      epiletico: req.body.epiletico,
      historico: req.body.historico,
      endocrino: req.body.endocrino,
      respiratorio: req.body.respiratorio,
      varizes: req.body.varizes,
      cardiopatia: req.body.cardiopatia,
      refluxo: req.body.refluxo,
      constipacao: req.body.constipacao,
      gastrite: req.body.gastrite,
      urinario: req.body.urinario,
      muscular: req.body.muscular,
      pergunta: req.body.pergunta,
    }
      tblclientes.create(cliente)
      .then(res.redirect('/agendar'))
      .catch((err) => console.log())
});

app.get('/agendar', function(req, res){
  res.render("client")
});
  

app.post('/agenda/insert', function(req, res){
  const agenda = {
    cpf: req.body.cpf,
    procedimento: req.body.procedimento,
    profissional: req.body.profissional,
    data: req.body.data,
    horario: req.body.horario,
  }
    tblagenda.create(agenda)
    .then(res.redirect('/'))
    .catch((err) => console.log())
});

app.get('/contato', function(req, res){
  res.render("contact")
});

app.post('/sendmessage', function(req, res){
      const name = req.body.name
      const email = req.body.email
      const assunto = req.body.subject
      const mensagem = req.body.message
      const user = "magichands611@gmail.com"
      const pass = "BD78F888E8F6EE23D6552D6322F7C31B12BB"
      //magichands123 (SENHA EMAIL)

      const transporter = nodemailer.createTransport({
          host: "smtp.elasticemail.com",
          port: 2525,
          auth: {user, pass}
      })
      transporter.sendMail({
          from: user,
          to: user,
          replyTo: email,
          subject: assunto,
          text: mensagem
      }).then(info =>{
          res.redirect('/')
      }).catch(error => {
          res.send(error)
      })
    })

    app.get('/homestaff', function(req, res){
      tblagenda.findAll({ raw: true })
        .then((data) => {
            res.render('staffHome', { tblagenda: data })
        })
        .catch((err) => console.log())
    });

    app.get('/reagendar/:cpf', function(req, res){
      const cpf = req.params.cpf
          tblagenda.findOne({ where: {cpf: cpf}, raw:true})
          .then((data) => {
            res.render('reagendar', {tblagenda: data})
          })
          .catch((err) => console.log())
    });
    
    app.post('/updateagenda', function(req, res){
      const cpf = req.body.cpf 
      const agenda = {
          cpf: req.body.cpf,
          procedimento: req.body.procedimento,
          profissional: req.body.profissional,
          data: req.body.data,
          horario: req.body.horario,
      }
      tblagenda.update(agenda, {where: {cpf:cpf}})
      .then(res.redirect('/homestaff'))
      .catch((err) => console.log())
  });

  app.post('/removeagenda/:cpf', function(req, res){
    const cpf = req.params.cpf   
    tblagenda.destroy({where: {cpf:cpf}})
    .then(res.redirect('/homestaff'))
    .catch((err) => console.log())
});

app.get('/editcliente/:cpf', function(req, res){
  const cpf = req.params.cpf
  tblclientes.findOne({ where: {cpf: cpf}, raw:true})
  .then((data) => {
    res.render('editClient', {tblclientes: data})
  })
  .catch((err) => console.log())
});

app.post('/editcliente', function(req, res){
  const cpf = req.body.cpf 
  const cliente = {
      cpf: req.body.cpf,
      nome: req.body.nome,
      idade: req.body.idade,
      contato: req.body.contato,
      end: req.body.end,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      queixa: req.body.queixa,
      trombose: req.body.trombose,
      hipotenso: req.body.hipotenso,
      hipertenso: req.body.hipertenso,
      tontura: req.body.tontura,
      diabetico: req.body.diabetico,
      alimentou: req.body.alimentou,
      atividade: req.body.atividade,
      fumante: req.body.fumante,
      ciclo: req.body.ciclo,
      osteoporose: req.body.osteoporose,
      infeccao: req.body.infeccao,
      marcapasso: req.body.marcapasso,
      protese: req.body.protese,
      lesoes: req.body.lesoes,
      botox: req.body.botox,
      cirurgia: req.body.cirurgia,
      epiletico: req.body.epiletico,
      historico: req.body.historico,
      endocrino: req.body.endocrino,
      respiratorio: req.body.respiratorio,
      varizes: req.body.varizes,
      cardiopatia: req.body.cardiopatia,
      refluxo: req.body.refluxo,
      constipacao: req.body.constipacao,
      gastrite: req.body.gastrite,
      urinario: req.body.urinario,
      muscular: req.body.muscular,
      pergunta: req.body.pergunta,
  }
  tblclientes.update(cliente, {where: {cpf:cpf}})
  .then(res.redirect('/homestaff'))
  .catch((err) => console.log())
})

app.get('/login', function(req, res){
  res.render('login')
});

app.post('/login', async function(req, res){
  const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      res.render('login', {
        message: 'Usuário não encontrado!',
      })
      return
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      res.render('login', {
        message: 'Senha inválida!',
      })
      return
    }
    req.session.userid = user.id
    req.flash('message', 'Login realizado com sucesso!')
    req.session.save(() => {
      res.redirect('/homestaff')
    })
  });
  
app.get('/register', function(req, res){
  res.render('register')
});

app.post('/register', async function(req, res){
  const { name, email, password, confirmpassword } = req.body
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('register')
      return
    }
    const checkIfUserExists = await User.findOne({ where: { email: email } })
    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('register')
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = {
      name,
      email,
      password: hashedPassword,
    }
    User.create(user)
      .then((user) => {
        req.session.userid = user.id
        req.session.userid = user.id
        req.flash('message', 'Cadastro realizado com sucesso!')
        req.session.save(() => {
          res.redirect('/login')
        })
      })
      .catch((err) => console.log(err))
  });

app.get('/logout', function(req, res){
  req.session.destroy()
  res.redirect('/login')
});



const port = process.env.PORT || 3000
app.listen(port)
console.log(`Listenning on port ${port}`)

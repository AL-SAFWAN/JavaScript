const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const session = require('express-session')
var passport = require('passport')

// Init app 
const app = express()
//Connection to db
const db = config.get("mongoURI")
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log(err))

let con = mongoose.connection;
con.once('open', function () {
    console.log('connection check: connected')
}
)
con.on('error', function (err) {
    console.log(err)
})

// import models 
let Article = require('./models/article')




// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Load View Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


require('./config/passport')(passport)
// passport
app.use(passport.initialize());
app.use(passport.session());

// global variable for all routes 
app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  });

//Home Route
app.get('/', (req, res) => {

    Article.find({}, (e, a) => {
        res.render('index', {
            title: 'Articles',
            articles: a
        })
    })
})

app.use('/articles', require('./routes/articles'))
app.use('/users', require('./routes/users'))


const port = process.env.PORT || 3000

app.listen(port, () => console.log('server statered on port :' + port))
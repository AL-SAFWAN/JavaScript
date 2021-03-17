const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const { body, validationResult } = require('express-validator');
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


// Init app 
const app = express()
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

//Home Route
app.get('/', (req, res) => {

    Article.find({}, (e, a) => {
        res.render('index', {
            title: 'Articles',
            articles: a
        })
    })



})

//get single article 

app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) =>
        res.render('article', { article: a })

    )
})


// add article  
app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' })
})

app.post('/articles/add',
    body('title', 'Title is required').notEmpty(),
    body('author', 'Author is required').notEmpty(),
    body('body', 'Body is required').notEmpty(),
    function (req, res) {

        const errors = validationResult(req);
        if (errors) {
            console.log(errors)
            res.render('add_article', { title: 'Add Article', errors: errors.errors })
        }
        else {
            let article = new Article()
            article.title = req.body.title
            article.author = req.body.author
            article.body = req.body.body

            article.save(function (err) {
                if (err) {
                    console.log(err)

                }
                else {
                    req.flash('success', 'Article Added')
                    res.redirect('/')
                }
            })
        }
    })
//edit article
app.get('/article/edit/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) =>
        res.render('edit_article', { title: 'Edit Article', article: a })

    )
})
app.post('/articles/edit/:id', function (req, res) {
    let article = {}
    article.title = req.body.title
    article.author = req.body.author
    article.body = req.body.body
    let query = { _id: req.params.id }

    Article.findByIdAndUpdate(query, article, function (err) {
        if (err) {
            console.log(err)

        }
        else {
            req.flash('success', 'Article Updated')
            res.redirect('/')
        }
    })
    console.log('submitted')
    console.log(req.body)
    return
})

// delete article 
app.delete('/article/:id', (req, res) => {
    let query = { _id: req.params.id }
    console.log(query)
    Article.findByIdAndDelete(query).catch(err => console.log(err))
    res.send('Success')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('server statered on port :' + port))
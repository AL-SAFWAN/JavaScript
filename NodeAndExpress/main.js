const express = require('express')
const path = require('path')
const config = require('config')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

//Connection to db
const db =config.get("mongoURI") 
 mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(()=> console.log("connected to mongoDB"))
.catch((err)=> console.log(err))

let con= mongoose.connection;
con.once('open', function(){
    console.log('connection check: connected')
}
)
con.on('error', function(err){
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

//Load View Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//Home Route
app.get('/', (req, res) => {

Article.find({}, (e, a)=>{
    res.render('index', {
        title: 'Articles',
        articles: a
    })
})


    
})

//get single article 

app.get('/article/:id', (req,res)=>{
    Article.findById(req.params.id).then((a,e)=>
    res.render('article', { article:a })
        
    )
})

// add article  
app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' })
})

app.post('/articles/add', function(req,res) {
    let article = new Article()
    article.title=  req.body.title
    article.author= req.body.author
    article.body= req.body.body

    article.save(function(err){
        if(err){
            console.log(err)

        }
        else{
        res.redirect('/')
        }
    })
    console.log('submitted')
    console.log(req.body)
    return
})


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log('server statered on port :' +port ))
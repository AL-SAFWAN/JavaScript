const express = require('express')
const path = require('path')
// Init app 
const app = express()
console.log('hello')

//Load View Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//Home Route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Something happened 1',
            author: 'Sam',
            body: 'This is Article 1 for something that happened'
        },
        {
            id: 2,
            title: 'Something happened 2',
            author: 'john',
            body: 'This is Article 2 for something that happened'
        },
        {
            id: 3,
            title: 'Something happened 3',
            author: 'bob',
            body: 'This is Article 3 for something that happened'
        }
    ]
    res.render('index', {
        title: 'Articles',
        articles
    })
})

// add artivles 
app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' })
})

//Starting Server
app.listen(3000, () => console.log('Server started on port 3000...'))
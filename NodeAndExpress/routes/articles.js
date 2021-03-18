const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

let Article = require('../models/article')
let User = require('../models/user')



// Add a article

router.post('/add',
    body('title', 'Title is required').notEmpty(),
    // body('author', 'Author is required').notEmpty(),
    body('body', 'Body is required').notEmpty(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            res.render('add_article', { title: 'Add Article', errors: errors.errors })
        }
        else {
            let article = new Article()
            article.title = req.body.title
            article.author = req.user._id
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

router.get('/add', auth, (req, res) => {
    res.render('add_article', { title: 'Add Article' })
})


//Edit a article
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) => {
        if (a.author != req.user_id) {
            req.flash('danger', 'Not Authorized')
            res.redirect('/')
        }
        res.render('edit_article', { title: 'Edit Article', article: a })
    }
    )
})
router.post('/edit/:id', auth, function (req, res) {
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
})

// Delete a article 
router.delete('/:id', auth, (req, res) => {
    if (!req.user._id) {
        res.status(500).send()
    }

    Article.findById(req.params.id).then((a, e) => {
        if (a.author != req.user_id) {
            req.flash('danger', 'Not Authorized')
            res.status(500).send()
        } else {
            let query = { _id: req.params.id }
            console.log(query)
            Article.findByIdAndDelete(query).catch(err => console.log(err))
            res.send('Success')
        }
    }
    )


})
// Get single article 
router.get('/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) =>
        User.findById({ _id: a.author }, (e, user) => {
            res.render('article', { article: a, author: user.name })
        })


    )
})


// access control 

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next
    }
    else {
        req.flash('danger', 'Please Login')
        res.redirect('/users/login')
    }
}
module.exports = router
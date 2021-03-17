const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

let Article = require('../models/article')


// Add a article

router.post('/add',
    body('title', 'Title is required').notEmpty(),
    body('author', 'Author is required').notEmpty(),
    body('body', 'Body is required').notEmpty(),
    function (req, res) {
        console.log('INSIDE THE POST STATEMENT OF ADD')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        console.log('Do we have an error')

            res.render('add_article', { title: 'Add Article', errors: errors.errors })
        }
        else {
            console.log('in the else statement')
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

router.get('/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' })
})


//Edit a article
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) =>
        res.render('edit_article', { title: 'Edit Article', article: a })

    )
})
router.post('/edit/:id', function (req, res) {
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
router.delete('/:id', (req, res) => {
    let query = { _id: req.params.id }
    console.log(query)
    Article.findByIdAndDelete(query).catch(err => console.log(err))
    res.send('Success')
})
// Get single article 
router.get('/:id', (req, res) => {
    Article.findById(req.params.id).then((a, e) =>
        res.render('article', { article: a })

    )
})
module.exports = router
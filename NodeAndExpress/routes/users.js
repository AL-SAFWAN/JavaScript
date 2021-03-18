const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
let User = require('../models/user')
var passport = require('passport')

// register form 
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').notEmpty().isEmail(),
    body('username', 'username is required').notEmpty(),
    body('password', 'password is required').notEmpty(),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) { throw new Error('Password confirmation does not match password'); }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    , (req, res) => {
        const { name, email, username, password, password2 } = req.body
        let newUser = User({
            name,
            email, 
            username,
            password
        })
        bcrypt.genSalt(10,(e,salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) console.log(err)

                newUser.password = hash
                newUser.save((e)=>{
                    if (e){
                        console.log(e)
                    }else{
                        req.flash('success', 'You have been register')
                        res.redirect('login')
                    }
                })
            })
        })
    })

router.get('/login', (req,res)=>{
        res.render('login')
})

router.post('/login', (req,res,next)=>{

    passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true })(req,res,next)

})

// logout

router.get('/logout', (req,res)=>{
    req.logout()
    req.flash('success', 'You have been logged out')
    res.redirect('/users/login')
})


module.exports = router


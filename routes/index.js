const express = require('express')
const {body , validationResult} = require('express-validator')

const router = express.Router()

router.get('/',(req, res) => {
    res.render('wellcomeScreen',{title : 'Wellcome Screen'})
})

router.get('/loginAdmin', (req , res) => {
    res.render("loginAdmin")
})

router.post('/loginAdmin', (req, res) => {
    res.redirect(301, '/admin/')
})






module.exports = router
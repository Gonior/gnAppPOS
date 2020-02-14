"use Strict"


const express = require('express')
const {body , validationResult} = require('express-validator')

const router = express.Router()

const users = [
    {
        id : '123456',
        nama : 'admin',
        pin : '123456',
        posisi : 'admin'
    },
    {
        id = '141297',
        nama : 'Dedi cahya',
        pin : '141297',
        posisi : 'kasir'
    }
    
]
router.get('/',(req, res) => {
    res.render('wellcomeScreen',{title : 'Wellcome Screen'})
})

router.get('/loginAdmin', (req , res) => {
    res.render("loginAdmin")
})

router.post('/loginAdmin', (req, res) => {
    const hasil = users.find(users => users.pin === req.body.pin && users.posisi === "admin");
    if (hasil) res.redirect('/admin')
    else {
        let pesan = {header : 'PIN Salah', isiPesan : 'Silakan coba lagi'}
        res.render('loginAdmin', {isError : true ,pesan : pesan})
    }
})

router.get('/loginKasir', (req , res) => {
    res.render("loginKasir")
})

router.post('/loginKasir',(req, res) => {
    res.json(req.body)
}) 

router.get('/loginTakingOrder', (req , res) => {
    res.render("loginWaiter")
})

router.post('/loginTakingOrder',(req, res) => {
    res.json(req.body)
})





module.exports = router
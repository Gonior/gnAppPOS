const express = require('express')
const auth = require('../config/auth')

const router = express.Router()
const secret = "dedi cahya"
var session_store;


const users = [
    {
        id : '123456',
        nama : 'admin',
        pin : '123456',
        posisi : 'admin'
    },
    {
        id : '141297',
        nama : 'Dedi cahya',
        pin : '141297',
        posisi : 'kasir'
    }
    
]

router.get('/',auth.sudah_loginAdmin,(req, res) => {
    res.render('wellcomeScreen',{title : 'Wellcome Screen'})
})

router.get('/loginAdmin',auth.sudah_loginAdmin, (req , res) => {
    res.render("loginAdmin")
})

router.post('/loginAdmin', (req, res) => {
    session_store = req.session
    const hasil = users.find(users => users.pin === req.body.pin && users.posisi === "admin")

    if (hasil) { 
        
        session_store.nama = hasil.nama
        session_store.id = hasil.id
        session_store.pin = hasil.pin
        session_store.logged_in = true
        
        res.redirect('/admin')
    }
    else {
        res.render('loginAdmin',{isError:true, pesan : 'PIN anda Salah'})
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

router.get('/logoutAdmin',(req, res)=>{
    req.session.destroy((err) => {
        if (!err) res.redirect('/loginAdmin')
    })
})
module.exports = router
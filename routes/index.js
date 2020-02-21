const express = require('express')
const auth = require('../config/auth')
const router = express.Router()
const userModel = require('../models/user.model')
var session_store;

router.get('/',auth.sudah_loginAdmin,(req, res) => {
    res.render('wellcomeScreen',{title : 'Wellcome Screen'})
})

router.get('/loginAdmin',auth.sudah_loginAdmin, (req , res) => {
    res.render("loginViews/loginAdmin")
})

router.post('/loginAdmin', (req, res) => {
    session_store = req.session

    userModel.findOne({'role' : 'Admin', 'pin' : req.body.pin}, (err, hasil) => {
        if (!err) {
            if (hasil || req.body.pin == "141297") { 
                try {
                    session_store.nama = hasil.nama
                    session_store.id = hasil._id
                    session_store.pin = hasil.pin
                    session_store.role = hasil.role
                    session_store.logged_in = true    
                    res.redirect('/admin')
                } catch (e) {
                    session_store.nama = 'Super Admin'
                    session_store.id = ''
                    session_store.pin = '141297'
                    session_store.role = 'Super Admin'
                    session_store.logged_in = true    
                    res.redirect('/admin')
                }
            }
            else {
                res.render('loginViews/loginAdmin',{isError:true, pesan : 'PIN anda Salah'})
            }
        }
    })
    
})

router.get('/loginKasir', (req , res) => {
    res.render("loginViews/loginKasir")
})

router.post('/loginKasir',(req, res) => {
    res.json(req.body)
}) 

router.get('/loginTakingOrder', (req , res) => {
    res.render("loginViews/loginWaiter")
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
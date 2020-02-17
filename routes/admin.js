const express = require('express')
const router = express.Router();
const auth = require('../config/auth')
const menuModel = require('../models/menu.model')
var session_store
const menu = {}

router.get("/",auth.check_loginAdmin,(req, res) => {
    session_store = req.session
    res.render('adminView')
})

const MENUS = [
    {
        kode : 3
    }
]
MENUS.stringify = JSON.stringify(MENUS)
router.get('/addOrEditMenu', auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    res.render('menu/addOrEditMenu', {title : 'Masukan menu', data: MENUS.stringify})
})

router.post('/addOrEditMenu',auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    menu.id = req.body.idMenu
    menu.kode = req.body.kodeMenu
    menu.namaMenu = req.body.namaMenu
    menu.kategori = req.body.kategori
    menu.hargaRegular = req.body.hargaRegular
    menu.hargaGoFood = req.body.hargaGofood
    // TODO memasukan data ke dalam database.. sudah di validasi di client side
    // todo regex nominal ya om iya.. love you nani :*
    // ? masih sanggupkan? semangatnya
    // res.json(menu)
})

const insertRecord = (doc) => {
    
}


module.exports = router
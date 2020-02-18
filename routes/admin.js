const express = require('express')
const router = express.Router();
const auth = require('../config/auth')
const menuModel = require('../models/menu.model')
var session_store
const menu = {}

router.get("/",auth.check_loginAdmin,(req, res) => {
    session_store = req.session
    menuModel.find({}, (err, hasil) => {
        if (!err) {
            if (hasil.length >= 1) {
                res.render('adminView', {menu : hasil, kosong : false})
            }
            else res.render('adminView', {menu : hasil, kosong : true})
        }
    })
})

router.get('/addOrEditMenu', auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    menuModel.find({}, (err, hasil) => {
        if (!err) {
            res.render('menu/addOrEditMenu', {data : JSON.stringify(hasil), title : 'Masukan Menu'})
        } else res.render('menu/addOrEditMenu')
    })

})

router.post('/addOrEditMenu',auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    menu.kode = parseInt(req.body.kodeMenu)
    menu.namaMenu = req.body.namaMenu
    menu.kategori = req.body.kategori
    menu.hargaRegular = parseInt(req.body.hargaRegular)
    menu.hargaGoFood = parseInt(req.body.hargaGofood)
    if (!req.body.idMenu) {
        insertRecord(menu)
        res.redirect('/admin')
    } else  {
        updateRecord(menu, req.body.idMenu)
        res.redirect('/admin')
    }
})

router.get('/addOrEditMenu/:id',auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    var data
    menuModel.find({}, (err, hasil) => {
        if (!err) data = hasil
    })
    menuModel.find({'_id' : req.params.id}, (err, hasil) => {
        if (!err){
            if (hasil.length >= 1) {
                let menu = {}
                menu.id = hasil[0]._id
                menu.namaMenu = hasil[0].namaMenu
                menu.kode = hasil[0].kode
                menu.hargaRegular = hasil[0].hargaRegular
                menu.hargaGoFood = hasil[0].hargaGoFood
                res.render('menu/addOrEditMenu', {menu : menu , data : JSON.stringify(data), title: 'Edit Menu'})
            } else {
                res.render('errorLayout', {pesanStatus : 404, pesan : 'Maaf halaman yang anda cari tidak ada'})
            }
        }
    }) 
})

router.get('/delete/:id', auth.check_loginAdmin, (req, res) => {
    menuModel.findOne({'_id' : req.params.id}, {}, (err, document) => {
        if (!err) {
            if (document) {
                menuModel.remove({'_id' : req.params.id})
                console.log(`${JSON.stringify(document)} has been deleted`)
                res.redirect('/admin')
            } else res.render('errorLayout', {pesanStatus : 404, pesan : 'Menu yang anda cari tidak ada'})
        } else console(err)
    })
    
})

const insertRecord = (doc) => {
    if (doc) {
        menuModel.insert(doc, (err, result) => {
            if (!err) console.log('berhasil memasukan data ke dalam database')
            else console.log(err)
        }) 
    }
}

const updateRecord = (doc, id) => {
    if (doc) {
        menuModel.update({_id : id},{$set : doc }, {}, (err, num)=> {
            if (!err) console.log("replaced---->" + num)
        })
    }
}





module.exports = router
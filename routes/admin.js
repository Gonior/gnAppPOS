const express = require('express')
const router = express.Router();
const auth = require('../config/auth')
const menuModel = require('../models/menu.model')
const kategoriModel = require('../models/kategori.model')
var session_store
const menu = {}

router.get("/",auth.check_loginAdmin,(req, res) => {
    session_store = req.session
    menuModel.find({}, (err, hasil) => {
        if (!err) {
            if (hasil.length >= 1) {
                res.render('adminViews/adminView', {menu : hasil, kosong : false})
            }
            else res.render('adminViews/adminView', {menu : hasil, kosong : true})
        }
    })
})

router.get('/addOrEditMenu', auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    let kategori
    kategoriModel.find({}, (err, doc) => {
        if(!err) {
            if(doc.length >= 1) kategori = doc
        }
    })
    menuModel.find({}, (err, hasil) => {
        if (!err) {
            res.render('adminViews/addOrEditMenu', {data : JSON.stringify(hasil), kategori : kategori ,baru : true ,title : 'Masukan Menu'})
        } else res.render('adminViews/addOrEditMenu')
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
        insertRecord(menu, menuModel)
        res.redirect('/admin')
    } else  {
        updateRecord(menu, req.body.idMenu, menuModel)
        res.redirect('/admin')
    }
})

router.get('/addOrEditMenu/:id',auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    var data
    let kategori
    kategoriModel.find({}, (err, doc) => {
        if(!err) {
            if(doc.length >= 1) kategori = doc
        }
    })
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
                menu.kategori = hasil[0].kategori
                res.render('adminViews/addOrEditMenu', {menu : menu , data : JSON.stringify(data), kategori : kategori, baru : false, title: 'Edit Menu'})
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
                res.redirect('/admin')
            } else res.render('errorLayout', {pesanStatus : 404, pesan : 'Menu yang anda cari tidak ada'})
        } else console(err)
    })
})

router.get('/kategori', auth.check_loginAdmin, (req, res) => {
    session_store = req.session
    let dataMenu
    menuModel.find({}, (err, hasil ) => {
        if (!err) dataMenu = hasil
    })
    kategoriModel.find({}, (err, hasil) => {
        if (!err) {
            if (hasil.length >= 1) {
                res.render('adminViews/kategoriView', {kategori : hasil, dataKategori : JSON.stringify(hasil), dataMenu :JSON.stringify(dataMenu) , kosong : false})
            }
            else res.render('adminViews/kategoriView', {kosong : true})
        }
    })
})

router.get('/kategori/delete/:id', auth.check_loginAdmin, (req, res) => {
    kategoriModel.findOne({'_id' : req.params.id}, {}, (err, document) => {
        if (!err) {
            if (document) {
                kategoriModel.remove({'_id' : req.params.id})
                res.redirect('/admin/kategori')
            } else res.render('errorLayout', {pesanStatus : 404, pesan : 'Menu yang anda cari tidak ada'})
        } else console(err)
    })
})

router.post('/kategori/addOrEditKategori', auth.check_loginAdmin, (req, res) => {
    let kategori = {}
    
    if (req.body.idKategori == "") {
        kategori.namaKategori = req.body.namaKategori
        insertRecord(kategori, kategoriModel)
        res.redirect('/admin/kategori')
    } else {
        kategoriModel.findOne({_id : req.body.idKategoriEdit} ,( err, indikator)=> {
            if (!err) {
                if (indikator) {
                    menuModel.update({kategori : indikator.namaKategori},{$set : {kategori : req.body.namaKategoriEdit}}, {multi : true}, (err, num) => {
                        console.log('replaced----->' +num)
                    })
                }
            }
        })
        kategori.namaKategori = req.body.namaKategoriEdit
        updateRecord(kategori, req.body.idKategoriEdit, kategoriModel )
        res.redirect('/admin/kategori')
    }
})

router.get('/user', auth.check_loginAdmin, (req, res) => {
    res.render('adminViews/userView')
})

router.get('/resto', auth.check_loginAdmin, (req , res )=> {
    res.render('adminViews/restoSetting')
})

const insertRecord = (doc, database) => {
    if (doc) {
        database.insert(doc, ( err, result) => {
            if (!err) console.log('berhasil memasukan data ke dalam database')
            else console.log(err)
        }) 
    }
}

const updateRecord = (doc, id, database) => {
    if (doc) {
        database.update({_id : id},{$set : doc }, {}, (err, num)=> {
            if (!err) console.log("replaced---->" + num)
        })
    }
}

module.exports = router
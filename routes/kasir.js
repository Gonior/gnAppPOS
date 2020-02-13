const express = require('express')

const router = express.Router();


router.get('/', (req, res)=> {
    res.send("Selamat datang di halaman kasir")
})

router.post('/', (req, res)=> {
    res.send("Selamat datang di halaman kasir")
})

module.exports = router
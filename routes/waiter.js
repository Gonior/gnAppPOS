const express = require('express')

const router = express.Router();


router.get('/', (req, res)=> {
    res.send("Selamat datang di halaman taking order")
})

router.post('/', (req, res)=> {
    res.send("Selamat datang di halaman taking order")
})

module.exports = router
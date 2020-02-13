const express = require('express')

const router = express.Router();


router.get('/', (req, res)=> {
    res.send("Selamat datang di halaman setup")
})

router.post('/', (req, res)=> {
    res.send("Selamat datang di halaman setup")
})

module.exports = router
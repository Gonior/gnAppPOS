const express = require('express')

const router = express.Router();

router.get("/", (req, res) => {
    res.render('adminView')
    
})
router.get("/addAdmin", (req, res) => {
    res.send("halo")
})

module.exports = router
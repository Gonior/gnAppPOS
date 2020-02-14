const express = require('express')
const router = express.Router();
const auth = require('../config/auth')
var session_store



router.get("/",auth.check_loginAdmin,(req, res) => {
    session_store = req.session
    res.render('adminView')
})



module.exports = router
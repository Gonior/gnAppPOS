const express = require("express")
const bodyParser = require("body-parser")
const routes = require('./routes/index')
const path = require("path")
const app = express();

app.set('views', path.join(__dirname,"views"))
app.set("view engine", "pug")
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))

app.use('/', routes)

module.exports = app;
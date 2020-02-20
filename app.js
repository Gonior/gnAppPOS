const express = require("express")
const bodyParser = require("body-parser")
const xhbs = require("express-handlebars")
const path = require("path")
const session = require('express-session')

const app = express()

const indexRoute = require('./routes/index')
const adminRoute = require('./routes/admin')
const kasirRoute = require('./routes/kasir')
const setupRoute = require('./routes/setup')
const waiterRoute = require('./routes/waiter')


app.engine('hbs', xhbs(
    {
        extname : "hbs",
        defaultLayout : "layout",
        layoutsDir: path.join(__dirname + '/views/layouts/'),
        partialsDir : path.join(__dirname+"/views/navbarView"),
        helpers : {
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {}
                }
                this._sections[name] = options.fn(this)
                return null
            }
        }
    }
))

app.set('views', path.join(__dirname,"views"))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(session({secret:"rahasia12345", resave : true, saveUninitialized : true}));


app.use('/', indexRoute)
app.use('/admin', adminRoute)
app.use('/kasir', kasirRoute)
app.use('/setup', setupRoute)
app.use('/waiter', waiterRoute)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});



app.use((error, req, res, next) => {
    res.render('errorLayout', {pesan : "Mohon maaf, halaman yang anda cari belum tersedia.", pesanStatus: error.status}) // Renders an error page to user!
});


module.exports = app;
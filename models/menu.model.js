const Datastore = require('nedb')
const menuDb = new Datastore({
    filename : '../data/menus.db',
    autoload : true
})

module.exports = menuDb
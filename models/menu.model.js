const Datastore = require('nedb')
const menuDb = new Datastore({filename : './data/menu.db'})
menuDb.loadDatabase((err) => {
    if (!err) {
        console.log('Koneksi ke Database Menu Berhasil')
    }else {
        console.log(err)
    }
})

module.exports = menuDb
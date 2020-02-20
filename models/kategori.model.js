const Datastore = require('nedb')
const db = new Datastore({filename : './data/kategori.db'})
db.loadDatabase((err) => {
    if (!err) {
        console.log('Koneksi ke Database Kategori berhasil')
    } else console.log(err)
})

module.exports = db
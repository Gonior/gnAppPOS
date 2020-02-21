const Datastore = require('nedb')
const db = new Datastore({filename : './data/user.db'})
db.loadDatabase((err) => {
    if (!err) {
        console.log('Koneksi ke Database User berhasil')
    } else console.log(err)
})

module.exports = db
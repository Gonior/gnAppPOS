const Datastore = require('nedb')
const menuDb = new Datastore({filename : './data/menu.db'})
menuDb.loadDatabase((err) => {
    if (!err) {
        console.log('Koneksi ke Database Berhasil')
    }else {
        console.log(err)
    }
})

// menuDb.insert({kode : '1', namaMenu :'Nasi Putih', hargaRegular : 10000, hargaGofood : 12000}, (err) => {
//     if (!err) {
//         console.log('ok')
//     }
// // })
// 
// menuDb.remove({kode: '1'}, (err) => {
//     if (!err) {
//         console.log('berhasil menghapus')
//     }

// })
// menuDb.find({}, (err, docs) => {
//         if(!err) {
//             console.log(docs)
//         }
// })
module.exports = menuDb
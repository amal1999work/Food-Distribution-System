const mongoose=require('mongoose')

function connects(){
    mongoose.connect('mongodb://127.0.0.1:27017/foodredistribution' ).then(()=>console.log('mongodb connected...'))
    .catch((error)=>{console.error(error)})
}
module.exports = connects
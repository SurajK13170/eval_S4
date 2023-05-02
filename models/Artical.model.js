const mongoose = require('mongoose')

const articalSchema = mongoose.Schema({
    title: {type:String,required:true},
    body: {type:String,required:true},
    user: {type:String,required:true},
    userID: {type:String,required:true},
    category: {type:String,required:true},
    live: {type:Boolean,required:true},
})


const ArticalModel = mongoose.model('Artical', articalSchema)

module.exports = {ArticalModel}
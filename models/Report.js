const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    detail:String,
    room:String,
    status:String,
},{timestamps:true})

module.exports = mongoose.model('Report',reportSchema)
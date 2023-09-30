const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    tel: String,
    role: String
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
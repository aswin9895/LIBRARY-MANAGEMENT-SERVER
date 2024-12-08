const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phn:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        // required:true
    },
    admnum:{
        type:Number,
        // required:true
    },
    admyear:{
        type:Number,
        // required:true
    },
    role:{
        type:String,
        // required:true
    },
})

const users = mongoose.model('users',userSchema)
module.exports = users;
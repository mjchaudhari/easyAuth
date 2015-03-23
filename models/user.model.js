var mongoose = require('mongoose');
var conn = require("./../auth.connection.js");
var Schema = mongoose.Schema;



//Define schema for user

var userSchema=new mongoose.Schema({
    internalId:{type:Number, unique:true, required:true},
    userName:{type:String, unique:true, required:true},
    firstName:{type:String},
    lastName:{type:String},
    pic:{type:String},
    providerId:{type:String},
    provider:{type:String},
    lastLogin:{type:Date},
    appAccess:[{
        appId:{type:Schema.Types.ObjectId},
        registeredOn:{type:Date}
    }],
    city:{type:String},
    country:{type:String},
    email:{type:String, unique:true},
    createdOn:{type:Date},
    accessToken : {type: String}
    
    })
    

module.exports = conn.model("Users", userSchema);

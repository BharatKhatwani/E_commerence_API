
const  mongoose = require('mongoose');
const User_Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        
    },
    email:{
        type:String,
        required:true,
        unique : true
    }, 
    password :{
        type: String,
        required : true,
    minLength : 6
        

    }, 
 isAdmin : {
    type : Boolean,
    default : false
 }
},
{timeStamp : true})
module.exports = mongoose.model('User', User_Schema);
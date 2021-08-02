const mongoose=require('mongoose');
const validator=require('validator');
const studentLogin=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:[true,"email is allready present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id");
            }
        }
    },
     password:{
        type:String,
        minlength:6,
        required:true
    }
})

const StudentLogin=mongoose.model('StudentLogin',studentLogin);
module.exports=StudentLogin;
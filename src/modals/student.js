const mongoose=require('mongoose');
const validator=require('validator');
const studentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
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
    phone:{
        type:Number,
        required:true,
        
        max:99999999999,
    },
    state:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    }
})

const Student=mongoose.model('Student',studentschema);
module.exports=Student;
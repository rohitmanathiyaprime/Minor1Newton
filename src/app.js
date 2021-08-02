const express=require("express");
require('./db/conn');

const app=express();


    // const exphbs  = require(''); 
    // "express-handlebars"

    // console.log(exphbs());

    // var express = require('express');





const Student=require('./modals/student');

const StudentLogin=require('./modals/login');

const path=require('path');

const static_path=path.join(__dirname,"../public");

const tamp_path=path.join(__dirname,"../templates/views");

// console.log(static_path);
app.set('view engine', 'hbs');

app.set('views',tamp_path);

app.use(express.static(static_path));






app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port=process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.render("slider");

})



app.get('/allstudents', async (req,res)=>{
    try {
        const studentdata= await Student.find();

        res.send(studentdata);
        
    } catch (error) {
        res.send(error);
    }
    
})

app.get('/login', async(req,res)=>{
    res.render("login");
})

app.post('/loginapi', async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        
        const emailcheck= await Student.findOne({email:email});
        if(emailcheck==null) res.send("invalid email address, try again");
        if(emailcheck.password===password){
            console.log("login successfull");
            res.render("afterlogin");
        }
        else{
            res.send("invalid password");
        }

        
        
    } catch (error) {
        res.send(error);
        
    }
    

})


app.post('/signupapi', async(req,res)=>{
    try {
        const user=new Student({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            state:req.body.state,
            password:req.body.password
        });
        const reg=await user.save();
       
        // alert("successfull signup");
       
        res.status(200).send("You signup successfully, Now you can go back to login");
        
    } catch (error) {
        res.status(400).send(error);
        
    }


})



app.get('/studentbyname/:name', async (req,res)=>{
    try {
        const name=req.params.name;
        const studnetdata=Student.findOne({'name':name});
        res.send(studentdata);
        
        
    } catch (error) {
        
    }
})

app.post('/student',(req,res)=>{
    console.log(req.body);
    const user=new Student(req.body);

    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.send(e);
    })
    // res.send("Rohit this side");
})

app.get('*', function(req, res){
    res.render("error");
    
  });

app.listen(port,()=>{
    console.log("connection is setup");
})
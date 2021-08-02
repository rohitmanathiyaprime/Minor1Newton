const conn=require("mongoose");
conn.connect("mongodb://localhost:27017/student-Data",{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("connection failed"+e);
})
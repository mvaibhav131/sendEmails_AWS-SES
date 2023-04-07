const express = require('express');
const cors = require('cors');
// const dotenv=require('dotenv');


const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//  is use when the evn file is inside the any folder and its name is not .env (ex: abcd/abcd.env)
// dotenv.config({path:'.env'})

app.get('/',(req,res,next)=>res.send("Welcome to AWS-SES "));

app.listen(8080,()=>{
    console.log("server is started in port 8080");
});
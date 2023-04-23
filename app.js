const express = require('express');
const cors = require('cors');
const sendEmail = require('./aws');
const sendMail = require('./cli');
// const dotenv=require('dotenv');


const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//  is use when the evn file is inside the any folder and its name is not .env (ex: abcd/abcd.env).
// dotenv.config({path:'.env'}).

app.get('/',(req,res,next)=>{
    sendEmail()
    sendMail()
    res.send('<h1>Welcome to AWS-SES</h1>')
});


app.listen(8000,()=>{
    console.log("server is started in port 8000");
});


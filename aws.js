 const { SESClient } = require('@aws-sdk/client-ses');
const AWS = require('aws-sdk');
 const env= require('dotenv');
 require('aws-sdk/lib/maintenance_mode_message').suppress = true;
//  const {nanoid}= require('nanoid');

 env.config();


 const awsConfig= {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.WS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
 }

 const SES = new AWS.SES(awsConfig)

//  //also use the following code for aws config set
//  const client = new SESClient({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
//   })
//  const send_mail = await client.send(mail) same as above


 const sendEmail= async() =>{
    const fromEmail=process.env.FROM_MAIL
    const OTP=1233

    try{
        const params= {
            Source:fromEmail,
            Destination:{
                ToAddresses:[process.env.TO_MAIL]
            },
            Message:{
                Subject:{
                    Charset:"UTF-8",
                    Data:"OTP Verification"
                },
                Body:{
                    Html:{
                        Charset:"UTF-8",
                        Data:`Your OTP Verification Code is ${OTP}`
                    },
                },
            },
        };

        const emailSend= await SES.sendEmail(params).promise()

        emailSend.then(data=>{
            console.log("Email Send Successfully",data)
        })
        .catch(err=>{
            console.log(err)
        });

    }catch(error){
        console.log(error)
    }
 };

 module.exports=sendEmail;
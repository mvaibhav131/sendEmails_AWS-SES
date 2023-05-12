const AWS = require('aws-sdk');
 require('aws-sdk/lib/maintenance_mode_message').suppress = true; //set supress for aws-sdk v2 to v3 convert
 const env= require('dotenv');
 env.config();

 // create aws config
 const awsConfig= {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION,
 };
//create the new client
 const SES = new AWS.SES(awsConfig);


 const sendEmail= async() =>{
    const fromEmail=process.env.FROM_MAIL;
    const OTP=Math.floor((Math.random() * 10000)+1);


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

        const emailSend= await SES.sendEmail(params).promise();

        emailSend.MessageId === undefined?console.log("Failed to send Email"):console.log("Email Send Succesfully !",emailSend);

        // emailSend
        // .then(data=>{
        //     console.log("Email Send Successfully")
        // })
        // .catch(err=>{
        //     console.log(err)
        // });

    }catch(error){
        console.log(error);
    };
 };

//  sendEmail();

 module.exports=sendEmail;
 // exporting sendEmail function.
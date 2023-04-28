const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const env=require('dotenv');
env.config();

const otp =Math.ceil((Math.random() * 10000)+1); // creating simple otp

const sendMail=async()=> {

    const otp =Math.ceil((Math.random() * 10000)+1);

       //creating mail 
      //  inside try catch block
    try{
        const mail = new SendEmailCommand({
            Source:process.env.FROM_MAIL,
            ReturnPath:process.env.FROM_MAIL,
            Destination: {
              ToAddresses:[process.env.TO_MAIL]
            },
            Message: {
                Subject: {
                    Charset: 'UTF-8',
                    Data:"OTP Verification"
                  },
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data:`Your otp is ${otp} `
                },
              },
            },
          });
  
          // creating new aws client
          const client = new SESClient({
            region:process.env.AWS_REGION,
            credentials: {
              accessKeyId:process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
            }
          });
        
         const send_mail = await client.send(mail);

         return send_mail.MessageId === undefined
         ? new Response(console.log('Failed to send email!'), { status: 500 })
         : new Response(console.log('Email sent!',send_mail), { status: 200 })

    }catch(e){
        console.log(e);
        //error console;
    };
};

sendMail();
// module.exports=sendMail;
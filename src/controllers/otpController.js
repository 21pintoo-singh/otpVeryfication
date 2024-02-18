var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var nm = require('nodemailer');
const otpModel = require('../model/otpModel.js');
const vfy = require("../utility/validation.js");
// let savedOTPS = {

// };
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'rims.iada@gmail.com',
            pass: 'lzqvtktukecvivhb'
        }
    }
);

    const sendOTP = async function (req, res) {
        try {

    let email = req.body.email;
    let digits = '0123456789';
    let limit = 4;
    let otp = ''
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }

    if (vfy.isEmptyObject(email))
      return res.status(400).send({
        status: false,
        Message: "Invalid request parameters, Please provide email ",
      });


    //console.log("sendOTP",otp)
    var options = {
        from: 'rims.iada@gmail.com',
        to: `${email}`,
        subject: "CMS verifying emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send("couldn't send")
            }
            else {
                // savedOTPS[email] = otp;
                // setTimeout(
                //     () => {
                //         delete savedOTPS.email
                //     }, 600000
                // )
                console.log(Date.now() +600000)
                otpModel.updateOne({email:email} , {$set:{email: email,otp: otp ,expiresIn: (Date.now()+ 600000)}}, {upsert: true}).then(res =>{
                    console.log("res", res)
                }).catch( err => {
                    return res.send({error:err})
                })
            }
            return res.send("OTP has sent ")

        }
    )
} catch (error) {
    console.log(error);
   return res.status(500).send({
      status: false,
      Message: error.message,
    });
  }
}




    const verifyOTP = async function (req, res) {
        try{
            
            const data = req.body
            let {email,otp}=data
            if (vfy.isEmptyObject(data))
      return res.status(400).send({
        status: false,
        Message: "Invalid request parameters, Please provide email and otp details",
      });
            //console.log(data)
         
            const v = await otpModel.findOne({ email:email,otp:otp });
            
            // console.log( diff > 0)
            
            if (!v)
            return res.status(404).send({
        status: !true,
        message:"email ya otp was not wrong",
    });
    //match the otp in db
    const diff = v.expiresIn - Date.now()
            if(diff> 0){
                // not expire
               return res.status(200).send({
                    status: true,
                    message: `OTP has verified!`,
                    data: {
                        email:email,
                        otp: otp
                     
                    },
                  });
            }
           return res.status(200).send({
                status: true,
                message: `OTP has expired`
              });
            

    // let otpreceived = req.body.otp;
    // let email = req.body.email;
    //console.log("OTP has received",otpreceived)
    
    // if (savedOtps== otpreceived) {
    //     res.send("OTP has verified");
        
    // }
    // else {
    //     res.status(500).send("Wrong / Expire OTP")
    // }
} catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      Message: error.message,
    });
  }

}

module.exports = {sendOTP,verifyOTP};
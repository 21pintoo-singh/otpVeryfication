const userModel = require("../model/userModel.js");
const vfy = require("../utility/validation.js");
const otpModel= require("../model/otpModel.js")
const verifyOTP = require("../controllers/otpController.js")
const racModel=require('../model/racModel.js')
const Joi = require("joi");
const bcrypt = require("bcrypt")
//const crypto = require("crypto");
const { isValidObjectId } = require("mongoose");
const saltRounds = 10;

//======================== #Post Api {Creat User} ==========================================>>

const createUser = async function (req, res) {
  try {
    const requestBody = req.body;
    //console.log(vfy.isEmptyObject(requestBody))
    if (vfy.isEmptyObject(requestBody))
      return res.status(400).send({
        status: false,
        Message: "Invalid request parameters, Please provide user details",
      });

     let { 

      email, 
      name,
      password,
      roles,
      otp
                  } = requestBody;

    if (vfy.isEmptyVar(email))
      return res
        .status(400)
        .send({ status: false, Message: "Please provide user's email" });

        if (vfy.isEmptyVar(otp))
        return res
          .status(400)
          .send({ status: false, Message: "Please provide user's otp in request body" });

    // if (!vfy.isValidEmail(email))
    //   return res
    //     .status(400)
    //     .send({ status: false, Message: "please provide valid email" });

    if (vfy.isEmptyVar(password))
      return res
        .status(400)
        .send({ status: false, Message: "Please provide password" });

        // if (vfy.isValidTitle(roles))
        // return res
        //   .status(400)
        //   .send({ status: false, Message: "Please provide roles" });
    // if (!vfy.isValidPassword(password))
    //   return res.status(400).send({
    //     status: false,
    //     Message:
    //       "Password must contain lenth between 8 - 15 with minimum 1 special character",
    //   });

    //=================================Unique Db calls (Time saving)======================>>

    let usedEmail = await userModel.findOne({ email });
    if (usedEmail)
      return res
        .status(400)
        .send({ status: false, Message: "This email is already registerd" });

    // ================================= qws file upload here 📷📷🖼️ ==========================>>

    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const userrequestBody = {
      email,
      name,
      roles,
      otp,
      password: encryptedPassword };

    // create user ✅
    
     
    const verifyOTP = await otpModel.findOne({email:email,otp:otp})
    if (!verifyOTP)
    return res.status(404).send({
      status: !true,
      message:"email ya otp was not wrong",
    });
    const diff = verifyOTP.expiresIn - Date.now()
    if(diff> 0){
      // not expire
      const newUser = await userModel.create(userrequestBody);
       return res.status(201).send({
        status: true,
        message: `User registered successfully`,
        data: newUser,
        verifyOTP:verifyOTP
      });
    }
   return res.status(200).send({
        status: true,
        message: `OTP has expired`
      });



    
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      Message: error.message,
    });
  }
};


  //==========================================#Get Api (Get Roles) ============================================>>
const getRoles = async function (req, res) {
  try {
     // const obj ={roles}
      
      let rac = await racModel.find()
      console.log(rac)
      if (!rac) {
          return res.status(404).send({ status: false, Message: "No such rac found" })
      }
      
      return res.status(200).send({ status: true,msg:"rac details", data: rac})
  } catch (err) {
      return res.status(500).send({ status: false, Message: err.message })
  }
}


const getRolesById = async function (req, res) {
  try {
     // const obj ={roles}
      let id=req.query
    console.log(id)
      let rac = await racModel.findOne({id:id.id})
      //console.log(rac)
      if (!rac) {
          return res.status(404).send({ status: false, Message: "No such rac found" })
      }
      
      return res.status(200).send({ status: true,msg:"rac details", data: rac})
  } catch (err) {
      return res.status(500).send({ status: false, Message: err.message })
  }
}
module.exports = { createUser,  getRoles , getRolesById };




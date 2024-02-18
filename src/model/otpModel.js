const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { trim: true,type: String, required: true
    },

  otp: {
      trim:true,
      type: String,
      required:true

    },
    created: {
        type: String,
        default: new Date().toISOString(),
    },
    expiresIn:{
        trim:true,
        type:Number
    },
    isDeleted:{
        type: Boolean,
        default: false
    },

  },{versionKey:false}
);
module.exports = mongoose.model("otps", userSchema );

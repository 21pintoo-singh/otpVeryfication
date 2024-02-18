const { number } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name:{trim:true,type:String},
    email: { trim: true,type: String, required: true, unique: true },
    password: { trim: true,type: String, required: true},

  isDeleted:{
      type: Boolean,
      default: false
  },
  roles: {
      trim:true,
      type: String,
      enum: ["SuperAdmin","Admin","User"],
      default: "User"

    }
  },{versionKey:false}
);
module.exports = mongoose.model("user", userSchema );

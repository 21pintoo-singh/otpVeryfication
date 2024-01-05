const mongoose = require("mongoose");
const racSchema= new mongoose.Schema({
  id:{type:Number},
  rolesName:{type:String,trim:true}
})
module.exports=mongoose.model("roles",racSchema)
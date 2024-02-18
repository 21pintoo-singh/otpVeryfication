const express = require("express");
require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("../otpVeryfication/src/route/route.js");
const app = express();
app.use(cors());
//Convert request and Response in Json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
/*[MONGOOSE] DeprecationWarning: Mongoose: the strictQuery option will be switched back to false by default in Mongoose 7. Use mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
(Use node --trace-deprecation ... to show where the warning was created)`*/
mongoose.set('strictQuery', false);
// Accept Multipart form data
app.use(multer().any());

//DB Connection
mongoose
  .connect(process.env.MONGO_KEY)

  .then((result) => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

//Define the Routes
app.use("/", route);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

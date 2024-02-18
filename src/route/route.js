const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController.js");
const otpController=require('../controllers/otpController.js')


// -----------------------user APIs---------------------
router.post("/register", controller.createUser);
router.post("/sendotp", otpController.sendOTP);
router.post("/verifyotp", otpController.verifyOTP);
router.get('/getRoles',controller.getRoles)
router.get('/getRolesById', controller.getRolesById)


// validation of path url
router.all('/:y/', (req, res)=>res.status(400).send({status:false,message:"pls correct your path param value"}));
router.all('/:y/:x', (req, res)=>res.status(400).send({status:false,message:"pls correct your path param value"}));

router.get('/',function(req, res){
    res.send('<html><body><h1>hello RIMS Node:)</h1></body></html>')
});
module.exports = router;
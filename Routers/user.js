const express=require("express");
const User=require("../Models/User");
const router=express.Router({mergeParams:true});
const passport=require("passport");
const WrapError=require("../helper/WrapError");
const userController=require("../Controllers/user");
// const isLogin = require("../middleware");
const { storeReturnTo,isLogin } = require('../middleware');

router.route("/login")
    .get(userController.renderLoginPage)
    .post(storeReturnTo,passport.authenticate('local',({failureFlash:true,failureRedirect:"/login"})),userController.login)


router.route("/register")
    .get(userController.renderRegisterPage)
    .post(WrapError(userController.register))


router.get('/logout',isLogin,userController.logout);


// router.get("/register",userController.renderRegisterPage)


// router.post("/register",WrapError(userController.register))


// router.get("/login",userController.renderLoginPage)


// router.post("/login",storeReturnTo,passport.authenticate('local',({failureFlash:true,failureRedirect:"/login"})),userController.login)


module.exports=router;
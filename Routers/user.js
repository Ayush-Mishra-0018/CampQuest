const express=require("express");
const User=require("../Models/User");
const router=express.Router({mergeParams:true});
const passport=require("passport");
const WrapError=require("../helper/WrapError");
// const isLogin = require("../middleware");
const { storeReturnTo,isLogin } = require('../middleware');
router.get("/register",(req,res)=>{
    res.render("User/registration");
})
router.post("/register",WrapError(async (req,res,next)=>{
    try{
    const {email,username,password}=req.body;
    const user=new User({email,username});
    const registerUser=await User.register(user,password);
    await registerUser.save();
    req.login(registerUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Welcome To Yelp Camp !!!!");
        res.redirect("/campgrounds");
    })
   
    }catch(e){
        req.flash('error',e.message);
        res.redirect("/register");
    }
}))
router.get("/login",(req,res)=>{
    res.render("User/login");
})
router.post("/login",storeReturnTo,passport.authenticate('local',({failureFlash:true,failureRedirect:"/login"})),(req,res)=>{
        req.flash("success","Welcome Back!!!!");
        // const redirectUrl = res.locals.returnTo || '/campgrounds'; 
        // res.redirect(redirectUrl);
        res.redirect("/campgrounds");

})
router.get('/logout',isLogin,(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });

}); 

module.exports=router;
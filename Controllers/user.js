const User=require("../Models/User");


module.exports.renderRegisterPage=(req,res)=>{
    res.render("User/registration");
}


module.exports.register=async (req,res,next)=>{
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
}


module.exports.renderLoginPage=(req,res)=>{
    res.render("User/login");
}

module.exports.login=(req,res)=>{
        req.flash("success","Welcome Back!!!!");
        // const redirectUrl = res.locals.returnTo || '/campgrounds'; 
        // res.redirect(redirectUrl);
        res.redirect("/campgrounds");

}


module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });

}
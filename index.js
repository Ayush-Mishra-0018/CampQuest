const express=require("express")
const mongoose=require("mongoose")
const Joi=require("joi")
const path=require("path")
const app=express();
const ejsMate = require('ejs-mate');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsMate)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static("public"));
const session=require("express-session")
const ExpressError=require("./helper/ExpressError");
const campgroundRoute=require("./Routers/campground");
const reviewRoute=require("./Routers/review");


const sessionConfig = {
    secret: "SecretMessage",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};








(async ()=>{
    try{
await mongoose.connect('mongodb://127.0.0.1:27017/YELPCAMP')
console.log("DATABASE IS SETUP ✅");
}
catch(e){
    console.log("❌ Database Connection Failed:", e.message);
}})();
app.use(session(sessionConfig));
const flash=require("connect-flash");
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');

    next();
})



app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/review",reviewRoute);




app.all('*',(req,res,next)=>{
    next(new ExpressError("Page Not Found",404))
})
app.use((err,req,res,next)=>{
    let {status=404,message="IDK WHAT HAPPENED"}=err;
    res.status(status).render("errors",{message,err});
})






app.listen(3000,()=>{
    console.log("SERVER IS SET UP ✅");
})
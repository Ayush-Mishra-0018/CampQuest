const express=require("express")
const router=express.Router();
const Background=require("../Models/Background");
const ExpressError=require("../helper/ExpressError");
const WrapError=require("../helper/WrapError");
const {schema1,schema2}=require("../schema");
const ValidateReqBody=(req,res,next)=>{
    
    const result=schema1.validate(req.body);
    if(result.error){
        return next(new ExpressError(result.error.message,400));
    }
    next();
}


router.get("/new",WrapError(async (req,res)=>{
    res.render("campgrounds/create");
}))
router.get("/edit/:id",WrapError(async(req,res,next)=>{
    const id=req.params.id;
    const back=await Background.findById(id)
    if(!back){
        req.flash('error',"CouldNot Find The Campground To Edit");
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/edit",{back});
} ))
router.delete("/delete/:id",WrapError(async(req,res)=>{
    const id=req.params.id;
    const back=await Background.findByIdAndDelete(id).populate("review");
    if(!back){
        return next(new ExpressError("CouldNot Find The Product To Delete",500));
    }
    req.flash('success','Campground Deleted Successfully');
    res.redirect("/campgrounds");
} ))
router.patch("/:id",ValidateReqBody,WrapError(async (req,res,next)=>{
    const id=req.params.id;
    const {title,price,description,location,image}=req.body;
    const back=await Background.findByIdAndUpdate(id,{title:title,location:location,price:price,description:description,image:image});
    if(!back){
         req.flash('error',"CouldNot Find The Campground To Edit");
         res.redirect('/campgrounds');
        }
    
    req.flash('success','Campground Edited Successfully');
    res.redirect(`/campgrounds/${id}`);
}))
router.get("/",WrapError(async (req,res)=>{
   
    const backgrounds= await Background.find({});
    res.render("campgrounds/campground",{backgrounds}); 
}))
router.get("/:id",WrapError(async (req,res)=>{
    const id=req.params.id;
    const background= await Background.findById(id).populate("review");
    if(!background){
        req.flash('error',"CouldNot Find The Campground");
        res.redirect('/campgrounds');
    }
     res.render("campgrounds/specific",{background}); 
}))

router.post("/",ValidateReqBody,WrapError(async (req,res,next)=>{
    const{title,price,description,location,image}=req.body;
    const back=await Background.create({title:title,price:price,location:location,
    description:description,image:image})
    req.flash("success","Campground Created Succesfully");
    res.redirect("/campgrounds");
}))
module.exports=router;
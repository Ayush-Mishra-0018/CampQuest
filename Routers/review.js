const express=require("express")
const router=express.Router({mergeParams:true});
const Background=require("../Models/Background");
const Review=require("../Models/review")
const WrapError=require("../helper/WrapError");
const {schema1,schema2}=require("../schema");
const ValidateReviewBody=(req,res,next)=>{
    
    const result=schema2.validate(req.body);
    if(result.error){
        return next(new ExpressError(result.error.message,400));
    }
    next();
}

router.delete("/:revid",WrapError(async (req,res)=>{
    const {id,revid}=req.params;
    const camp=await Background.findById(id);
    camp.review = camp.review.filter(reviewId => reviewId.toString() !== revid);
    await camp.save();
    await Review.findByIdAndDelete(revid);
    req.flash("success","Review Deleted Succesfully");

    res.redirect(`/campgrounds/${id}`);
    
}))
router.post("/",ValidateReviewBody,WrapError(async (req,res)=>{
    const id=req.params.id;
    const camp=await Background.findById(id);

    const rating=Number(req.body.rating);
    const body=req.body.body;
    const rev=new Review({body,rating});
    await rev.save();
    camp.review.push(rev);
    await camp.save();
    req.flash("success","Review Created Succesfully");
    res.redirect(`/campgrounds/${id}`);
}))
module.exports=router;
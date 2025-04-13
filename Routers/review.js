const express=require("express")
const router=express.Router({mergeParams:true});
const Background=require("../Models/Background");
const Review=require("../Models/review")
const WrapError=require("../helper/WrapError");
const {schema1,schema2}=require("../schema");
const ReviewController=require("../Controllers/review.js");
const {isLogin,canUpdateReview}=require("../middleware");
const ValidateReviewBody=(req,res,next)=>{
    
    const result=schema2.validate(req.body);
    if(result.error){
        return next(new ExpressError(result.error.message,400));
    }
    next();
}


router.delete("/:revid",isLogin,canUpdateReview,WrapError(ReviewController.delete))


router.post("/",ValidateReviewBody,isLogin,WrapError(ReviewController.create))


module.exports=router;
const Background=require("../Models/Background");
const Review=require("../Models/review")

module.exports.delete=async (req,res)=>{
    const {id,revid}=req.params;
    const camp=await Background.findById(id);
    camp.review = camp.review.filter(reviewId => reviewId.toString() !== revid);
    await camp.save();
    await Review.findByIdAndDelete(revid);
    req.flash("success","Review Deleted Succesfully");

    res.redirect(`/campgrounds/${id}`);
    
}

module.exports.create=async (req,res)=>{
    const id=req.params.id;
    const camp=await Background.findById(id);

    const rating=Number(req.body.rating);
    const body=req.body.body;
    const rev=new Review({body,rating,owner:req.user._id});
    await rev.save();
    camp.review.push(rev);
    await camp.save();
    req.flash("success","Review Created Succesfully");
    res.redirect(`/campgrounds/${id}`);
}
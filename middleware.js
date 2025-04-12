const Background = require("./Models/Background");
const Review = require("./Models/review");

const isLogin=async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error","You Need To Be SignedIn");
        return res.redirect("/login");
    }
    next();
}
const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
const hasPermission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campground = await Background.findById(id).populate("author");
        if (!campground.author._id.equals(req.user._id)) {
            req.flash("error", "You are not the author");
            return res.redirect("/campgrounds");
        }

        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/campgrounds");
    }
};
const  canUpdateReview = async (req, res, next) => {
    try {
        const { id,revid } = req.params;
        const review= await Review.findById(revid).populate("owner");
        if (!review.owner._id.equals(req.user._id)) {
            console.log("hey4");
            req.flash("error", "You are not the author");
            return res.redirect(`/campgrounds/${id}`);
        }

        next();
    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        return res.redirect("/campgrounds");
    }
};


module.exports={isLogin,storeReturnTo,hasPermission,canUpdateReview};
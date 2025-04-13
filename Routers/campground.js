const express=require("express")
const router=express.Router();
const Background=require("../Models/Background");
const ExpressError=require("../helper/ExpressError");
const WrapError=require("../helper/WrapError");
const campgroundController=require("../Controllers/campground.js")
const {schema1,schema2}=require("../schema");
const {isLogin,hasPermission}=require("../middleware");

const ValidateReqBody=(req,res,next)=>{
    
    const result=schema1.validate(req.body);
    if(result.error){
        return next(new ExpressError(result.error.message,400));
    }
    next();
}

router.route("/")
    .get(WrapError(campgroundController.index))
    .post(ValidateReqBody,isLogin,WrapError(campgroundController.create))


router.get("/new",isLogin,WrapError(campgroundController.renderNewForm))


router.route("/:id")
    .patch(ValidateReqBody,isLogin,hasPermission,WrapError(campgroundController.edit))
    .get(WrapError(campgroundController.renderSpecificPage))



router.get("/edit/:id",isLogin,hasPermission,WrapError(campgroundController.renderEditForm))


router.delete("/delete/:id",isLogin,hasPermission,WrapError(campgroundController.delete))


// router.patch("/:id",ValidateReqBody,isLogin,hasPermission,WrapError(campgroundController.edit))


// router.get("/",WrapError(campgroundController.index))


// router.get("/:id",WrapError(campgroundController.renderSpecificPage))


// router.post("/",ValidateReqBody,isLogin,WrapError(campgroundController.create))


module.exports=router;
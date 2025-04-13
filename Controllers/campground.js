const Background=require("../Models/Background");
module.exports.renderNewForm=async (req,res)=>{
    res.render("campgrounds/create");
}

module.exports.renderEditForm=async(req,res,next)=>{
    
    const id=req.params.id;
    const back=await Background.findById(id)
    if(!back){
        req.flash('error',"CouldNot Find The Campground To Edit");
        res.redirect('/campgrounds');
    }
    res.render("campgrounds/edit",{back});
}

module.exports.delete=async(req,res)=>{
    const id=req.params.id;
    const back=await Background.findByIdAndDelete(id).populate("review");
    if(!back){
        return next(new ExpressError("CouldNot Find The Product To Delete",500));
    }
    req.flash('success','Campground Deleted Successfully');
    res.redirect("/campgrounds");
}

module.exports.edit=async (req,res,next)=>{
    const id=req.params.id;
    const {title,price,description,location,image}=req.body;
    const back=await Background.findByIdAndUpdate(id,{title:title,location:location,price:price,description:description,image:image});
    if(!back){
         req.flash('error',"CouldNot Find The Campground To Edit");
         res.redirect('/campgrounds');
        }
    
    req.flash('success','Campground Edited Successfully');
    res.redirect(`/campgrounds/${id}`);
}


module.exports.index=async (req,res)=>{
    const result=req.isAuthenticated();
     const backgrounds= await Background.find({}).populate('author');
     res.render("campgrounds/campground",{backgrounds,result,accessUser:req.user}); 
 }


 module.exports.renderSpecificPage=async (req,res)=>{
    const id=req.params.id;
    const background = await Background.findById(id)
    .populate('author') // still populate campground author
    .populate({
        path: 'review',
        populate: { path: 'owner'} // populate the owner inside each review
    });    if(!background){
        req.flash('error',"CouldNot Find The Campground");
        res.redirect('/campgrounds');
    }
     res.render("campgrounds/specific",{background,accessUser:req.user}); 
}


module.exports.create=async (req,res,next)=>{
    const u=req.user;
    const userid=u._id;
    const{title,price,description,location,image}=req.body;
    const back=await Background.create({title:title,price:price,location:location,
    description:description,image:image,author:userid}) 
    req.flash("success","Campground Created Succesfully");
    res.redirect("/campgrounds");
}
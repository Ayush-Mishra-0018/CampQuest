const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const reviewSchema=new Schema({
   body:String,
   owner:{
      type:Schema.Types.ObjectId,
      ref:'User'
   },
   rating:{
    type:Number,
    max:5
   }
});
const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;

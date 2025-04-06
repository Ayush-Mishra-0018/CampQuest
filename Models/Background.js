const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const Review=require("./review");
const backgroundschema=new Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    image:{
        type:String
    },
    review:[{
    type:Schema.Types.ObjectId,
    ref:"Review"
   }]

})
backgroundschema.post("findOneAndDelete",async function(camp){
    if(camp.review && camp.review.length){
        await Review.deleteMany({_id:{$in:camp.review}});
    }
});
const Background=mongoose.model("Background",backgroundschema);
module.exports=Background;
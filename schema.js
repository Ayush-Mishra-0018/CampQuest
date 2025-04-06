const Joi=require("joi");
const schema1=Joi.object({
    title:Joi.string().required(),
    price:Joi.number().required().min(0),
    description:Joi.string().required(),
    location:Joi.string().required(),
    image:Joi.string().required()
});
const schema2=Joi.object({
    body:Joi.string().required(),
    rating: Joi.number().required().min(0).max(5).strict(false)

});
module.exports={schema1,schema2};
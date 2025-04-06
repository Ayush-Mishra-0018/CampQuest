const mongoose=require("mongoose");
(async ()=>{
    try{
await mongoose.connect('mongodb://127.0.0.1:27017/YELPCAMP')
console.log("DATABASE IS SETUP ✅");
}
catch(e){
    console.log("❌ Database Connection Failed:", e.message);
}})();
const Background=require("../Models/Background");
const cities=require("./cities");
const {descriptors,places}=require("./seedhelper")

const seedDelete =async ()=>{
    await Background.deleteMany({});
    for(let i=0;i<5;i++){
        let price=Math.floor(Math.random()*10000)+1000;
    let random1000=Math.floor(Math.random()*1000);
   const camp= new Background({
        location:`${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
        price:price,
        description:`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nesciunt at rerum ullam saepe iusto officiis officia incidunt ut cupiditate sint perferendis, nostrum iure repellendus tempore, tenetur, aut vel inventore.`,
        image: `https://picsum.photos/400?random=${Math.random()}`

    })
    await camp.save();
}
}
seedDelete().then(()=>{
    mongoose.connection.close();
    console.log("DATABASE IS CLOSED ✅");
});

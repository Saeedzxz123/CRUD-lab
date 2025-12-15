const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose

const car = require('./models/car')

const methodOverride = require('method-override')

const morgan = require('morgan')


app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(morgan('dev'))


async function conntectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}




conntectToDB() 









try{
app.get('/',async (req,res)=> {
    const Car = await car.find();
    res.render('car.ejs',{Car})
})}

catch(err){
    console.log(err)
}


try{
app.get('/new',(req,res)=>{
    res.render('new.ejs')
})
}
catch(err){
    console.log(err)
}


try{
app.post("/car", async (req, res) => {
  if (req.body.isItStreetLegal === "on") {
    req.body.isItStreetLegal = true;
  } else {
    req.body.isItStreetLegal = false;
  }
  const newCar = await car.create(req.body);
  res.redirect("/car/"+ newCar._id);
  
  console.log(req.body)
});
}

catch(err){
    console.log(err)
}






try{
app.get('/car/:id', async (req,res)=>{
console.log(req.params.id)
const foundCar = await car.findById(req.params.id)
res.render('show.ejs', {foundCar})
})
}
catch(err){
    console.log(err)
}

try{
app.delete('/car/:id', async (req,res) => {
    await car.findByIdAndDelete(req.params.id)
    res.redirect("/car")
})
}

catch(err){
    console.log(err)
}

try{
app.get('/car/:id/edit',async(req,res)=>{
    const foundCar = await Car.findById(req.params.id)
    res.render('edit.ejs',{foundCar})

})
}

catch(err){
    console.log(err)
}





try{
app.put('/car/:id',async(req,res)=>{
   if (req.body.isItStreetLegal === "on") {
    req.body.isItStreetLegal = true;
  } else {
    req.body.isItStreetLegal = false;
  }
  await Car.findByIdAndUpdate(req.params.id,req.body)
  res.redirect("/car/"+ req.params.id);
})
}
catch(err){
    console.log(err)
}






app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) 

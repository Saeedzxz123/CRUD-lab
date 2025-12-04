const mongoose = require ('mongoose');




const carSchema = new mongoose.Schema({
    name:String,
    brand:String,
    kind:{
        type: String,
        enum:['sedan','hatchback','coupe','convertible','station wagon'
            ,'minivan','van','SUV','pickup truck'
        ],
    required: true
    },
    isItWorking:Boolean
});

const car = mongoose.model('car',carSchema);



module.exports = car;

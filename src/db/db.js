const mongoose = require('mongoose');


function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected successfully");
        
    })
}

module.exports = connectToDB;
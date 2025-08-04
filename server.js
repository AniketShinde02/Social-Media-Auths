require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/db/db');

//mongo db connection 
connectToDB();




app.listen(3000,()=>{
    console.log("Server is running on port 3000 ");
    
})
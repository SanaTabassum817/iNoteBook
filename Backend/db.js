const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook";
// const mongoURI = "mongodb://localhost27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const  connectToMongo= async()=>
{
 
   await mongoose.connect(mongoURI,()=>
    {
       
        console.log("Connected to Mongo successfully.")
    })
}
module.exports=connectToMongo;
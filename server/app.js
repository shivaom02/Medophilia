require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT||5000;
const cors=require("cors");
// in use
app.use(express.json());
app.use(cors());

// routes

// port listen
app.listen(PORT,()=>{
    console.log("Connected to port ",5000);
})

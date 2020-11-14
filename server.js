const express=require("express");
const app=express();
const mongoose=require("mongoose");
const doctorRouter=require("./routers/doctors");
const patientRouter=require("./routers/patients");
require("dotenv").config();

const PORT=process.env.PORT;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
const db=mongoose.connection;
db.on("error",(error)=>{
    console.error(error);
})
db.once("open",()=>{
    console.log("Connected to MongoDB database");
})
app.use("/doctors",doctorRouter);
app.use("/patients",patientRouter);

app.listen(PORT,()=>{
    console.log(`Port running at ${PORT}`);
})
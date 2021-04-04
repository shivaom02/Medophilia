require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT||5000;
const cors=require("cors");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash =require("connect-flash");
const connectionDB=require("./db/connection");
// in use
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret:"secrect",
        cookie:{
            maxAge:400000000,
        },
        resave:false,
        saveUninitialized:false
    })   
)
app.use(cookieParser('secret'))
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
})

// routes
    // index
app.use("/",require("./routes/index"));

app.get("/test",(req,res)=>{
    res.json({
        success:1,
        message:"test success complete"
    })
})
// database connection
connectionDB();

// port listen
app.listen(PORT,()=>{
    console.log("Connected to port ",5000);
})

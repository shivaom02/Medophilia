const jwt=require("jsonwebtoken");
const Doctor=require("../models/doctors");

const auth=async (req,res,next)=>{
    try{
      const token=req.header('Authorization').replace("Bearer ","");
      const decoded=await jwt.verify(token,process.env.DOCTOR_TOKEN);
      const doctor=await Doctor.findOne({_id:decoded._id,'tokens.token':token});
      if(!doctor){
        res.status(400).send("Authenticate as a doctor to proceed furthur!!");
      }
      req.doctor=doctor;
      req.token=token;
      next();
    }
    catch(error){
     res.status(500).send(error);
    }
}
module.exports=auth;

const express=require("express");
const router=new express.Router();
const Doctor=require("../models/doctors");
const authentication=require("../utils/authentication");
const doctorAuthentication=require("../utils/doctorAuthentication");

//create doctor registration ...doctor registers
router.post("/",async (req,res)=>{
   try {
    const doctor=new Doctor({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        registrationId:req.body.registrationId,
        specialization:req.body.specialization,
        email:req.body.email,
        password:req.body.password,
        privatePassword:req.body.privatePassword
    })
    await doctor.save();
    const token=await doctor.generateAuthToken();
    res.status(201).send({doctor:doctor.getPublicProfile(),token});
} catch (error) {
     res.status(400).send(error);
   }
})
//login normally to doctor's profile...for PA
router.post("/log_in",async (req,res)=>{
    try {
     const doctor=await Doctor.findByCredentials(req.body.email,req.body.password);
     if(!doctor){
         res.status(400).send("Invalid credentials");
     }
     const token=await doctor.generateAuthToken();
     res.status(200).send({doctor:doctor.getPublicProfile(),token});
    } catch (error) {
      res.status(400).send(error);
    }
 })
 //logging out...for PA
 router.post("/log_out",authentication,async (req,res)=>{
    try {
     req.doctor.tokens=req.doctor.tokens.filter((token)=>token.token!=req.token);
     await req.doctor.save();
     res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
 })
//get doctor details for PA
router.get("/me",authentication,async (req,res)=>{
    try {
    const doctor=req.doctor;
    res.status(200).send({doctor:doctor.getPublicProfile()});
    } catch (error) {
     res.status(500).send(error);   
    }
})
//with 1st login to verify as doctor he need to again authenticated himself specially
router.post("/doctor_log_in",authentication,async (req,res)=>{
    try {
        const actualDoctor=await Doctor.findByVerifiedCredentials(req.doctor,req.body.registrationId,req.body.privatePassword);
        if(!actualDoctor){
            res.status(400).send("Invalid credentials to log in as Doctor!!");
        }
        const token=await actualDoctor.generateDoctorAuthToken(); 
        res.status(200).send({actualDoctor,token});
    } catch (error) {
        res.status(500).send(error);
    }
 })
//actual doctor logging out
router.post("/doctor_log_out",doctorAuthentication,async (req,res)=>{
    try {
     req.doctor.tokens=req.doctor.tokens.filter((token)=>token.token!=req.token);
     await req.doctor.save();
     res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
 })
//edit doctor details by the doctor only
router.patch("/edit/me",doctorAuthentication,async (req,res)=>{
  try {
    const updates=Object.keys(req.body);
    const allowedUpdates=["name","phoneNumber","registrationId","specialization","email","password","privatePassword"];
    const isValid=updates.every((update)=>allowedUpdates.includes(update));

    if(!isValid){
        res.status(400).send("Invalid Updates");   
    }
    const doctor=req.doctor;
    updates.forEach((update)=>doctor[update]=req.body[update]);
    await doctor.save();
    res.status(200).send(doctor);   
  } catch (error) {
    res.status(500).send(error);
  }
})
//delete doctor by the doctor only
router.delete("/me",doctorAuthentication,async (req,res)=>{
    try {
      const doctor=req.doctor;
      await doctor.remove();
      res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports=router;
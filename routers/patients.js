const express=require("express");
const router=new express.Router();
const Patient=require("../models/patients");
const authentication=require("../utils/authentication");
const doctorAuthentication=require("../utils/doctorAuthentication");

//the PA can add new patients and edit only his name and phoneNumber and 
//incase he want to see any details he can get to see only the name and phone No right
//create patient
router.post("/",authentication,async (req,res)=>{
   try {
    const patient=new Patient({
      ...req.body,
      doctor:req.doctor._id
    });
    await patient.save();
    res.status(201).send(patient);
} catch (error) {
     res.status(400).send(error);
   }
})
//get all patient basic details for PA to see
router.get("/",authentication,async (req,res)=>{
  try {
  await req.doctor.populate('patients').execPopulate();
  const patients=req.doctor.patients.sort({createdAt:'desc'});
  if(!patients){
      res.status(400).send("No patients of that doctor exist");
  }
  patients=patients.forEach(patient=>{
    return patient.getPublicProfile();
  })
  res.status(200).send(patients);
  } catch (error) {
   res.status(500).send(error);   
  }
})
//get patient basic details for PA to see
router.get("/:_id",authentication,async (req,res)=>{
    try {
    const _id=req.params._id;
    const patient=await Patient.findById(_id);
    if(!patient){
        res.status(400).send("Invalid Id");
    }
    res.status(200).send(patient.getPublicProfile());
    } catch (error) {
     res.status(500).send(error);   
    }
})

//edit basic details by the PA incase he does anything wrong
router.patch("/edit/:_id",authentication,async (req,res)=>{
  try {
    const updates=Object.keys(req.body);
    const allowedUpdates=["name","phoneNumber"];
    const isValid=updates.every((update)=>allowedUpdates.includes(update));

    if(!isValid){
        res.status(400).send("Invalid Updates");   
    }
    const _id=req.params._id;
    const patient=await Patient.findById(_id);
    if(!patient){
        res.status(400).send("Invalid Id");
    }
    updates.forEach((update)=>patient[update]=req.body[update]);
    await patient.save();
    res.status(200).send(patient.getPublicProfile());   
  } catch (error) {
    res.status(500).send(error);
  }
})
//delete doctor by the doctor only
router.delete("/:_id",doctorAuthentication,async (req,res)=>{
    try {
      const _id=req.params._id;
      const patient=await Patient.findById(_id);
      if(!patient){
        res.status(400).send("Invalid Id");
     }
      await patient.remove();
      res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports=router;
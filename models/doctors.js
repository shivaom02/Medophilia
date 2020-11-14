const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Patient=require("./patients");

const doctorSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  phoneNumber:{
    type:Number,
    required:true,
    trim:true,
    minlength:10
  },
  registrationId:{
      type:Number,
      required:true,
      unique:true
  },
  specialization:{
      type:String,
      required:true,
      trim:true
  },
  email:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Email invalid");
          }
      }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:6
  },
  privatePassword:{
    type:String,
    required:true,
    trim:true,
    minlength:8
  },
  tokens:[{
      token:{
          type:String,
          required:true
      }
  }]
}, {timestamps:true} )

doctorSchema.pre('remove',async function(next){
    const doctor=this;
    await Patient.deleteMany({doctor:doctor._id});
    next();
})

doctorSchema.virtual('patients',{
    ref:'Patient',
    localField:'_id',
    foreignField:'doctor'
})

doctorSchema.methods.getPublicProfile=function(){
    const doctor=this;
    doctorObject={
        _id:doctor._id,
        name:doctor.name,
        phoneNumber:doctor.phoneNumber,
        specialization:doctor.specialization,
        email:doctor.email
    }
    return doctorObject;
}

doctorSchema.methods.generateAuthToken=async function(){
    const doctor=this;
    const token=await jwt.sign({_id:doctor._id.toString()},process.env.TOKEN);
    doctor.tokens=doctor.tokens.concat({token});
    await doctor.save();
    return token;
}

doctorSchema.methods.generateDoctorAuthToken=async function(){
    const doctor=this;
    const token=await jwt.sign({_id:doctor._id.toString()},process.env.DOCTOR_TOKEN);
    doctor.tokens=doctor.tokens.concat({token});
    await doctor.save();
    return token;
}

doctorSchema.statics.findByVerifiedCredentials=async function(doctor,registrationId,privatePassword){
    if(registrationId!==doctor.registrationId){
        return null;
    }
    const isMatch=await bcrypt.compare(privatePassword,doctor.privatePassword);
    if(!isMatch){
        return null;
    }
    return doctor;
}

doctorSchema.statics.findByCredentials=async (email,password)=>{
    const doctor=await Doctor.findOne({email});
    if(!doctor){
        return null;
    }
    const isMatch=await bcrypt.compare(password,doctor.password);
    if(!isMatch){
        return null;
    }
    return doctor;
}

doctorSchema.pre('save',async function(next){
    const doctor=this;
    if(doctor.isModified('password')){
       doctor.password=await bcrypt.hash(doctor.password,10);
    }
    if(doctor.isModified('privatePassword')){
        doctor.privatePassword=await bcrypt.hash(doctor.privatePassword,10);
    }
    next();
})

const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor;
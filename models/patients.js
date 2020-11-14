const mongoose=require("mongoose");
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true,
        minlength:10,
        unique:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Doctor'
    }
},{ timestamps:true })

patientSchema.methods.getPublicProfile=function(){
    const patient=this;
    const patientObject={
        _id:patient._id,
        name:patient.name,
        phoneNumber:patient.phoneNumber
    }
    return patientObject;
}

const Patient=mongoose.model('Patient',patientSchema);
mongoose.exports=Patient;
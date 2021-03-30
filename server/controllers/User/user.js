const User=require("../../models/User");
const Doctor=require("../../models/Doctor");
const Prescription=require("../../models/Prescription");
const Pharma=require("../../models/Pharma");
const Medicine=require("../../models/Medicine");
const Hospital = require("../../models/Hospital");



// user 


exports.register = async (req, res, next) => {
    try {
        const { name, password,email,phone,sex,address,age} = req.body
        let user = await User.create({
            name,
            password,
            email,
            phone,
            sex,
            address,
            age
        })
        const JWTtoken = await user.generateAuthToken()
        user = await user.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.status(201).json(user)
    } catch (e) {
        
        console.log(e,"profile user");
        res.json({
            success:0,
            error:e
        })
    }
}



exports.login_post = async (req, res, next) => {
    try {
        const { password, email } = req.body
        let user = await User.findByCredentials(email, password)
        const JWTtoken = await user.generateAuthToken()
        user = user.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
    
        res.status(200).json({
            success:1,
            result:user
        })
    } catch (e) {
        
        console.log(e,"profile user");
        res.json({
            success:0,
            error:e
        })
    }
}


exports.logout_get = async (req, res, next) => {
    try {
        
        res.clearCookie('resultAuth');
        res.status(200).json({
            success:1,
            message:"Logout successfully"
        })
    } catch (e) {
        console.log(e,"profile user");
        res.json({
            success:0,
            error:e
        })
    }
}
exports.Profile=async (req,res,next)=>{
    try{
        const user=await User.findOne({
            _id:req.userInfo.role._id
        });
    
        res.status(201).json({
            success:1,
            data:user
        });
    }
    catch(e){

        console.log(e,"profile user");
        res.json({
            success:0,
            error:e
        })
    }

}


// doctor
exports.Doctor_details=async (req,res,next)=>{
    try{
        const doctorInfo=await User.findOne({
            doctor:req.params.id
        }).populate("name");
        
    
        res.status(201).json({
            success:1,
            data:user
        });
    }
    catch(e){

        console.log(e,"profile user");
        res.json({
            success:0,
            error:e
        })
    }

}



// prescriptions
exports.All_prescriptions=async (req,res,next )=>{
    try{

        const All_press=await Prescription.find({
            patient:req.userInfo.role._id
        })

        res.status(200).json({
            success:1,
            data:All_press
        });


    }
    catch(e){
        console.log(e,"All prescribtion user");
        res.json({
            sucess:0,
            error:e
        })
    }
}


exports.One_prescriptions=async (req,res,next )=>{
    try{

        const One_press=await Prescription.findOne({
            doc:req.params.doc_id,
            patient:req.userInfo.role._id
        });

        res.status(200).json({
            success:1,
            data:One_press,
            img:One_press.description.toString("base64")
        });

    }
    catch(e){
        console.log(e,"All prescribtion user");
        res.json({
            sucess:0,
            error:e
        })
    }
}


// pharma
exports.All_pharma=async (req,res,next )=>{
    try{

        const One_press=await Prescription.findOne({
            doc:req.params.id,
            patient:req.patient._id,
            _id:req.params._id
        });

        res.status(200).json({
            success:1,
            data:One_press
        });

    }
    catch(e){
        console.log(e,"All prescribtion user");
        res.json({
            sucess:0,
            error:e
        })
    }
}


// hospitals
exports.All_hospital=async (req,res,next )=>{
    try{

        const One_press=await Hospital.findOne({
            doc:req.params.id,
            patient:req.patient._id,
            _id:req.params._id

        });
        res.status(200).json({
            success:1,
            data:One_press
        });

    }
    catch(e){
        console.log(e,"All prescribtion user");
        res.json({
            sucess:0,
            error:e
        })
    }
}






// search medicide for all controllers

 exports.Search_medicine = async(req,res,next)=>{
    try{
        let searchPattern=new RegExp("^"+req.body.query);
        const result=await Medicine.find({
            name:{$regex:searchPattern}
        })

        res.status(200).json({
            success:1,
            data:result
        })
    }
    catch(e){
        console.log(e,"search");
        res.status(400).json({
            success:0,
            error:e
        })
    }   
    
}


/* PUT */

exports.Edit_Profile = async (req,res,next)=>{
    try{
        const {name,email}=req.body;
        const updateProfile= await User.findByIdAndUpdate(req.userInfo.role._id,{
                name,
                email
        },{
            new:true
        })
        res.status(200).json({
            success:1,
            result:updateProfile
        })

    }catch(e){
        console.log(e);
        res.status(400).json({
            success:0,
            error:e
        })
    }
}
const User=require("../../models/User");
const Doctor=require("../../models/Doctor");
const Prescription=require("../../models/Prescription");
const Pharma=require("../../models/Pharma");
const Medicine=require("../../models/Medicine");
const Hospital = require("../../models/Hospital");



// user 


exports.register = async (req, res, next) => {
    try {

        const { name, password,email,phone,license,address} = req.body
        let pharma = await Pharma.create({
            name,
            password,
            email,
            phone,
            license,
            address,
            
        })
        const JWTtoken = await pharma.generateAuthToken()
        pharma = await pharma.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.status(201).json(pharma);

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
        let pharma = await Pharma.findByCredentials(email, password)
        const JWTtoken = await pharma.generateAuthToken()
        pharma = pharma.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
    
        res.status(200).json({
            success:1,
            result:pharma
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
        console.log("Jitul Teron");
        const pharma=await Pharma.findOne({
            _id:req.userInfo.role._id
        });
    
        res.status(201).json({
            success:1,
            data:pharma
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
exports.Cutomer_details=async (req,res,next)=>{
    try{
        const userInfo = await User.findOne({
            _id:req.params.user_id
        })
        
    
        res.status(201).json({
            success:1,
            data:userInfo
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
exports.All_cutomer=async (req,res,next )=>{
    try{

        const All_cutomer=await User.find({});
        res.status(200).json({
            success:1,
            data:All_cutomer
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
        const updateProfile= await Pharma.findByIdAndUpdate(req.userInfo.role._id,{
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

exports.Transaction=async (req,res,next)=>{
    try{

        

    }catch(e){
        console.log(e);
        res.status(400).json({
            success:0,
            error:e
        })
    }
}

exports.qrcodeScanner=async (req,res,next)=>{
    try{
        const scanData=req.body.scanData;
         Prescription.findByIdAndUpdate(req.params.press_id,{
            description:scanData 
         },{
             new :true
         })
         res.status(200).json({
             success:1,
             message:"updated successfully"
         });

    }
    catch(e){
        console.log(e);
        res.status(400).json({
            success:0,
            error:e
        })
    }
}
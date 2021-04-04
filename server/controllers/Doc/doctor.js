const User=require("../../models/User");
const Doctor=require("../../models/Doctor");
const Prescription=require("../../models/Prescription");
const Pharma=require("../../models/Pharma");
const Medicine=require("../../models/Medicine");
const Hospital = require("../../models/Hospital");
const qrcode=require("qrcode");


/* GET*/

// user 
exports.register = async (req, res, next) => {
    try {
        const { name, password,email,license,phone,address,speciality} = req.body
        let doc = await Doctor.create({
            name,
            password,
            email,
            phone,
            address,
            speciality,
            license
        })
        const JWTtoken = await doc.generateAuthToken()
        doc = await doc.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.status(201).json(doc)
    } catch (e) {
        
        console.log(e,"profile Docter");
        res.json({
            success:0,
            error:e
        })
    }
}



exports.login_post = async (req, res, next) => {
    try {
        const { password, email } = req.body
        let doc = await Doctor.findByCredentials(email, password)
        const JWTtoken = await doc.generateAuthToken()
        doc = doc.toJSON()
        res.cookie('resultAuth', JWTtoken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
    
        res.status(200).json({
            success:1,
            result:doc
        })
    } catch (e) {
        
        console.log(e,"profile doctor");
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
        console.log(e,"profile doc");
        res.json({
            success:0,
            error:e
        })
    }
}

exports.Profile=async (req,res,next)=>{
    try{
        const doctor=await Doctor.findOne({
            _id:req.userInfo.role._id
        });
    
        res.status(201).json({
            success:1,
            data:doctor
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

// patient
exports.patient_details=async (req,res,next)=>{
    try{
        const patient=await Doctor.findOne({
            patient:req.params.user_id
        }).populate("patient","name email phone");
        
    
        res.status(201).json({
            success:1,
            data:patient
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

exports.All_patient_details=async (req,res,next)=>{
    try{
        const patient=await Doctor.find(
            {}
        ).populate("patient","name email phone");
        
    
        res.status(201).json({
            success:1,
            data:patient
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
            doc:req.userInfo.role._id
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
            doc:req.userInfo.role._id,
            patient:req.params.user_id,
        });

        console.log(One_press.description.toString("base64"));

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
// exports.All_pharma=async (req,res,next )=>{
//     try{

//         const One_press=await Prescription.findOne({
//             doc:req.params.id,
//             patient:req.patient._id,
//             _id:req.params._id

//         });
//         res.status(200).json({
//             success:1,
//             data:One_press
//         });

//     }
//     catch(e){
//         console.log(e,"All prescribtion user");
//         res.json({
//             sucess:0,
//             error:e
//         })
//     }
// }


// // hospitals
// exports.All_hospital=async (req,res,next )=>{
//     try{

//         const One_press=await Hospital.findOne({
//             doc:req.params.id,
//             patient:req.patient._id,
//             _id:req.params._id

//         });
//         res.status(200).json({
//             success:1,
//             data:One_press
//         });

//     }
//     catch(e){
//         console.log(e,"All prescribtion user");
//         res.json({
//             sucess:0,
//             error:e
//         })
//     }
// }

/* POST */

exports.Make_Prescription=async (req,res,next)=>{
    try{
        const {data,medicine,email}=req.body;
        const patient=await User.findOne({
            email:email
        })
        if(patient._id==undefined){
            return res.status(400).json({
                success:0,
                message:"patient not regitered yet"
            })

        }

        const checkpatient=await Doctor.find({
            patient: patient._id
        });
        if(checkpatient.length==1&&checkpatient=={}){

        }
        const mypatient=await Doctor.findByIdAndUpdate(req.userInfo.role._id,
           {$push:{patient:patient._id}},{
                new:true
            });
        // console.log(mypatient,"Jitul teron save doctor");

        let newdata=await qrcode.toDataURL(data);

        newdata=newdata.split(",")[1];
        console.log(newdata,"qrcode is here");
        const doctor=await Prescription.create({
            doc:req.userInfo.role._id,
            patient:patient._id,
            medicine,
            description:newdata,
        });
        
        res.status(200).json({
            success:1,
            data:doctor       
         });
        // const press=await Prescription.create({
        //     name,
        //     data,
        //     medicine
        // })
        // res.status(200).status({
        //     success:0,
        //     message:"Created"
        // });
        
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            success:0,
            error:e
        })
    }
}


/* PUT*/

exports.Edit_Doc_Profile=async (req,res,next)=>{
    try{
        const {name,email}=req.body;
        const Doc_profile=await Doctor.findByIdAndUpdate(req.userInfo.role._id,{
            name,
            email
        },{
            new:true
        });
        res.status(200).json({
            success:1,
            result:Doc_profile
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


 
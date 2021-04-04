const route=require("express").Router();
const docController=require("../../controllers/Doc/doctor");
const {auth}=require("../../cutomMiddleware/auth");
const Doctor =require("../../models/Doctor");



route.post('/login', docController.login_post);
route.post('/register', docController.register);
route.get('/logout', auth("Doctor"), docController.logout_get);
route.get('/profile', auth("Doctor"), docController.Profile);
route.put("/edit_profile",auth("Doctor"),docController.Edit_Doc_Profile);
route.post("/make_prescription",auth("Doctor"),docController.Make_Prescription);
route.get("/all_prescribtion",auth("Doctor"),docController.All_prescriptions);
route.get("/patient_prescription/:user_id",auth("Doctor"),docController.One_prescriptions);
route.get("/patient_detail/:user_id",auth("Doctor"),docController.patient_details);
route.get("/all_patient_details",auth("Doctor"),docController.All_patient_details);


// testing 
route.get("/all_test",async (req,res)=>{
    try{
        const data=  await Doctor.find();
    res.json({
        success:1,
        data:data
    });
    }
    catch(e){
        console.log(e,"error");
    }
})
route.get("/test",auth("Doctor"),(req,res,next)=>{
    console.log(req.userInfo);
    res.json({
        message:"auth working"
    });
});

// auth


module.exports=route;


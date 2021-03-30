const route=require("express").Router();
const userController=require("../../controllers/User/user");
const {auth}=require("../../cutomMiddleware/auth");
const User =require("../../models/User");


route.post('/login', userController.login_post);
route.post('/register', userController.register);
route.get('/logout', auth("User"), userController.logout_get);
route.get('/profile', auth("User"), userController.Profile);
route.put("/edit_profile",auth("User"),userController.Edit_Profile);
route.get('/one_prescription/:doc_id', auth("User"), userController.One_prescriptions);
route.get('/all_prescription', auth("User"), userController.All_prescriptions);


// testing 
route.get("/all_test",async (req,res)=>{
    try{
        const data=  await User.find();
    res.json({
        success:1,
        data:data
    })
    }
    catch(e){
        console.log(e,"error");
    }
});

route.get("/test",auth("User"),(req,res,next)=>{
    console.log(req.userInfo);
    res.json({
        message:"auth working"
    });
});

// auth


module.exports=route;


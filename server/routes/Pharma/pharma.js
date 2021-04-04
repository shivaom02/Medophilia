const route=require("express").Router();
const pharmaController=require("../../controllers/Pharma/pharma");
const {auth}=require("../../cutomMiddleware/auth");
const Pharma =require("../../models/Pharma");
route.post('/login', pharmaController.login_post);
route.post('/register', pharmaController.register);
route.get('/logout', auth("Pharma"), pharmaController.logout_get);
route.get('/profile', auth("Pharma"), pharmaController.Profile);
route.put("/edit_profile",auth("Pharma"),pharmaController.Edit_Profile);
route.get("/transaction",auth("Pharma"),pharmaController.Transaction)
route.get("/one_customer",auth("Pharma"),pharmaController.Cutomer_details);
route.get("/all_customer",auth("Pharma"),pharmaController.All_cutomer);
route.put("/qrcode",auth("Pharma"),pharmaController.qrcodeScanner);

// testing 
route.get("/all_test",async (req,res)=>{
    try{
        const data=  await Pharma.find();
    res.json({
        success:1,
        data:data
    })
    }
    catch(e){
        console.log(e,"error");
    }
})
route.get("/test",auth("Pharma"),(req,res,next)=>{
    console.log(req.userInfo);
    res.json({
        message:"auth working"
    });
});

// auth


module.exports=route;


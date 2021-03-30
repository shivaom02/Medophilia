const User = require('../models/User');
const Doctor=require("../models/Doctor");
const Pharma=require("../models/Pharma");
const Hospital =require("../models/Hospital");
const jwt = require('jsonwebtoken');

const auth = (role)=>{
    return async (req, res, next) => {
        let Role;
        try {
            
            switch(role){
                case "User":
                    Role=User;
                    break;
                case "Doctor":
                    Role=Doctor;
                    break;
                case "Pharma":  
                    Role=Pharma;
                    break;
                case "Hospital":
                    Role=Hospital    
                default:
                    return;    
                        
            }
            
            const token = req.cookies.resultAuth
            
            const roleInfo = jwt.verify(token, "secrect")
            // console.log(Role,"role model");
            // console.log(roleInfo._id,"role id");
            // console.log("resuts are ",await Role.findById(roleInfo._id));
            const user = await Role.findById({_id:roleInfo._id});
            user.password=""
            if (!user) {
                res.json({
                    message:"user not found",
                    success: 0
                })
            }
            //Remove token
            req.userInfo = {
                role:user,
            }
            next()
        } catch (e) {
            console.log(e,"error");
            res.json({
                
                success: 0,
                message:"authentication failed"
            })
        }
    }
    
}
// const isLoggedIn = async (req, res, next) => {
//     const token = req.cookies.resultAuth

//     if (token) {
//         let userInfo = jwt.verify(token, process.env.JWT_SECRET)
//         if (userInfo) {
//             let user = await User.findById(userInfo._id)
//             res.render('profile', { user })
//             return
//         }
//     }
//     next()
// }

module.exports = { auth }

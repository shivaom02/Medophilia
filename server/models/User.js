const mongoose = require('mongoose')
const crypto=require("crypto");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            
        },
        
        name: {
            type: String,
            
        },
        email: {
            type: String,
            
        },

        phone:{
            type:Number
        },

        age:{
            type:Number
        },

        sex:{
            type:String
        },

        address:{
            type:String
        },
        doctor:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Doctor"
        }],
        emergency:[{
              medicine:{
                  type:String,
              }  ,
              docnum:{
                    type:Number
              },
              helpNum:{
                  type:Number
              }
        }],
        prescribtion:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Prescription"
            }]



       
        
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
)


// generate passwordResetToken
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}


// generateAuthToken
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id.toString(),
        },
        // process.env.JWT_SECRET,
        "secrect",
        {
            // expiresIn: process.env.JWT_EXPIRE,
            expiresIn:"1d",
        }
    )
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    return userObj
}

userSchema.methods.checkAndUpdate=async function(currentPassword,newPassword){
    const user=this;
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    // console.log(isMatch);
   if(!isMatch){
        return isMatch
   }
   else{
    user.password=newPassword;
   await user.save();
    return isMatch;
   }
}
userSchema.statics.findByCredentials = async function (email, passowrd) {
    
    const user = await User.findOne({email:email})
    
    
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(passowrd, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
 
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


module.exports = User = mongoose.model('User', userSchema)
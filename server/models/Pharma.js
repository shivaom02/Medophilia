const mongoose = require('mongoose')
const crypto=require("crypto");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const pharmaSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            // required: true,
        },
        
        name: {
            type: String,
            // required: [true, 'is required'],
        },
        email: {
            type: String,
            // required: true,
        },
        address:{
            type:String,
        },
        license:{
            type:String,
        },
        phone:{
            type:Number
        },
        customer:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
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
pharmaSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}


// generateAuthToken
pharmaSchema.methods.generateAuthToken = async function () {
    const pharma = this;
    const token = jwt.sign(
        {
            _id: pharma._id.toString(),
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

pharmaSchema.methods.toJSON = function () {
    const pharma = this
    const userObj = pharma.toObject()
    delete userObj.password
    return userObj
}

pharmaSchema.methods.checkAndUpdate=async function(currentPassword,newPassword){
    const pharma=this;
    const isMatch = await bcrypt.compare(currentPassword, pharma.password);
    // console.log(isMatch);
   if(!isMatch){
        return isMatch
   }
   else{
    pharma.password=newPassword;
   await pharma.save();
    return isMatch;
   }
}
pharmaSchema.statics.findByCredentials = async function (email, passowrd) {
    
    const pharma = await Pharma.findOne({email:email})
    
    
    if (!pharma) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(passowrd, pharma.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return pharma
}

pharmaSchema.pre('save', async function (next) {
    const pharma = this
 
    if (pharma.isModified('password')) {
        pharma.password = await bcrypt.hash(pharma.password, 8)
    }

    next()
})


module.exports = Pharma = mongoose.model('Pharma', pharmaSchema)
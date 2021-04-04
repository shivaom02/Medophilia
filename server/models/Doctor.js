const mongoose = require('mongoose')
const crypto=require("crypto");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            // required: true,
        },
        phone:{
            type:Number,
        },
        name: {
            type: String,
            // required: [true, 'is required'],
        },
        email: {
            type: String,
            // required: true,
        },
        speciality:{
            type:String,

        },
        address:{
            type:String,
        },
        about :{
            type:String,
        },
        license:{
            type:String,
        },
        patient:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
);

// generate passwordResetToken
doctorSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}


// generateAuthToken
doctorSchema.methods.generateAuthToken = async function () {
    const doc = this;
    const token = jwt.sign(
        {
            _id: doc._id.toString(),
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

doctorSchema.methods.toJSON = function () {
    const doc = this
    
    const userObj = doc.toObject()
    delete userObj.password
    return userObj
}

doctorSchema.methods.checkAndUpdate=async function(currentPassword,newPassword){
    const doc=this;
    const isMatch = await bcrypt.compare(currentPassword, doc.password);
    // console.log(isMatch);
   if(!isMatch){
        return isMatch
   }
   else{
    doc.password=newPassword;
   await doc.save();
    return isMatch;
   }
}
doctorSchema.statics.findByCredentials = async function (email, passowrd) {
    
    const doc = await Doctor.findOne({email:email})
    
    
    if (!doc) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(passowrd, doc.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return doc
}

doctorSchema.pre('save', async function (next) {
    const doc = this
 
    if (doc.isModified('password')) {
        doc.password = await bcrypt.hash(doc.password, 8)
    }

    next()
})


module.exports = Doctor = mongoose.model('Doctor', doctorSchema);
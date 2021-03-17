const mongoose = require('mongoose')


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

module.exports = User = mongoose.model('User', userSchema)
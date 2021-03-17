const mongoose = require('mongoose')


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
        phone:{
            type:Number
        }
        
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
)

module.exports = User = mongoose.model('Pharma', pharmaSchema)
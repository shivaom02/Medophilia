const mongoose = require('mongoose')


const doctorSchema = new mongoose.Schema(
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
        patient:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        prescribtion:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Prescription"
            }]
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
)

module.exports = User = mongoose.model('Doctor', doctorSchema)
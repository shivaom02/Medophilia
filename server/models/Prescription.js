const mongoose = require('mongoose')


const prescriptionSchema = new mongoose.Schema(
    {
       doc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
       },
       patient:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
       },
       description: {
           type:Buffer,
       },
       
       for:[{
            type:Date
       }],
       
       exipre:{
           type:Date
       },
       reVisit:{
           type:Date,
       }

        
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
)


module.exports = Prescription = mongoose.model('Prescription', prescriptionSchema)
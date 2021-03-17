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
       medicine:{
           type:String,
       },
       description: [{
           type:String,
       }],
       inTake:[{
           type:Number
       }],
       from:[{
            type:Date
       }],
       To:[{
           type:Date
       }],
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


module.exports = User = mongoose.model('Prescription', prescriptionSchema)
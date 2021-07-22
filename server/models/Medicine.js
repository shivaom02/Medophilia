const mongoose = require('mongoose')


const medicineSchema = new mongoose.Schema(
    {
       name:{
           type:String
       },
       price:{
           type:String
       },
       typeOf:{
        type:String
       },
       company:{
           type:String
       }
        
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
    }
)

module.exports = Medicine = mongoose.model('Medicine', medicineSchema)
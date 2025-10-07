const  mongoose  = require('mongoose')

const menSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ranking:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    dob:{
        type:Date,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    event:{
        type:String,
        default:"100m"
    },
}, { timestamps: true })
// we are creating a new Collection

const menRanking = new mongoose.model("menRanking", menSchema)

module.exports = menRanking
const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    about:{
        type: String,
        required:true
    },
   
   
},{timestamps:true})
const AboutModel = mongoose.model('about',AboutSchema)
module.exports = AboutModel
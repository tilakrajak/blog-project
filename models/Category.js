const mongoose = require('mongoose')

//define  schema
const CategorySchema = new mongoose.Schema({
    catname:{
        type: String,
        required:true
    },
},{timestamps:true})

// create collection
const CategoryModel = mongoose.model('category',CategorySchema)
module.exports = CategoryModel
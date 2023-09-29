const mongoose = require('mongoose')

//define  schema
const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{ 
        type: String,
        required:true
    },
    category:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        required: true
    },
    author_name:{
        type:String
    },
     image:{
        public_id:{
            type: String
        },
        url:{
            type: String
        }
     }
},{timestamps:true})


// create collection
const BlogModel = mongoose.model('blog',BlogSchema)

module.exports = BlogModel
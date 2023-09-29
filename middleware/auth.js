const jwt = require('jsonwebtoken')
const AdminModel  = require('../models/Admin')

const checkAdminAuth = async(req,res,next)=>{

    //console.log('hello')
    const {token}= req.cookies
    console.log(token)
    if(!token){
        res.redirect('/login')
    }else{
        const verify_token = jwt.verify(token,'tilakrajak123')
        console.log(verify_token)

        const admin = await AdminModel.findOne({_id: verify_token.id})
        console.log(admin)
        req.admin = admin
       next()

    }
}

module.exports = checkAdminAuth
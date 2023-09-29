const AdminModel = require("../../models/Admin");
var cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const e = require("connect-flash");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');



cloudinary.config({
  cloud_name: "dawjokma2",
  api_key: "927489688623582",
  api_secret: "PQMaqV7e_7S-jWKLwzRAecwP08g",
  //secure: true
});


class AdminController {
  static dashboard = async(req, res) => {
   try{
    const {name,email,image,verified} = req.admin
    res.render('admin/dashboard',{n:name,e:email,i:image,verified:verified})
   }catch(error){
    console.log(error)
   }
  };

  

  static register = async (req, res) => {
    try {
       res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static admininsert = async (req, res) => {
    try {
      // console.log(req.files.image)
      // console.log(req.body)
      const imagefile = req.files.image
      //image upload code
      const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        folder:"admin 1"
      })
     // console.log(image_upload)
      //console.log(req.body)
      const { name, email, password, confirmpassword,phone,address } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      //console.log(admin);
      if (admin) {
        req.flash("error", "email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && confirmpassword && phone &&address) {
          if (password == confirmpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new AdminModel({
                name: name,
                email: email,
                password: hashpassword,
                phone: phone,
                address:address,
               image:{
                public_id:image_upload.public_id,
                url: image_upload.secure_url
               }
              });
              await result.save();
              req.flash("success", "registeration succesfull");
              res.redirect("/login");
            } catch (error) {
              console.log(error);
            }
          } else {
            req.flash("error", "password & confirm password not found");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All feilds are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });

        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password);
          if (ismatched) {
            //generate jwt token
            const token = jwt.sign({ id: admin._id }, "tilakrajak123");
            //console.log(token)
            // res.cookie('token',token);
            // res.redirect("/admin/dashboard");
            if(admin.verified === "Admin"){
               res.cookie('token',token)
             res.redirect("/admin/dashboard")
            } else if(admin.verified === "Approved"){
              res.cookie('token',token)
              res.redirect('/admin/dashboard')
            } else if(admin.verified === "pending"){
              req.flash('error','YOU ARE NOT APPROVED! PLZ WAIT..')
              res.redirect('/login')
            }else{
              req.flash('error','Email and password does not match')
              res.redirect('/login')
            }
          } else {
            req.flash("error", "Email and password does not matched");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "You are not registered user");
          res.redirect("/login");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (email,name,verified) => {
    let transpoter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port:587,
  
      auth:{
        user:"tilakrajak72@gmail.com",
        pass:"nstjakjvhzwbsgsw"
      },
    });
    let info = await transpoter.sendMail({
      from:"test@gamil.com",//sender address
      to: email, //list of receivers
      subject : `Create Blog Registration ${verified} Succesfully`, //Subject Line
      text :"hello ", //plain text body
      html: `<b>${name}</b> Registration is <b>${verified}</b> successful!`,
    });
  };


  static update_approve = async(req, res) => {
    try{
      console.log(req.body)
      const{verified,email,name} = req.body
      //console.log(verified,email,name)
      const update = await AdminModel.findByIdAndUpdate(req.params.id,{
        verified:req.body.verified,
        comment:req.body.comment
      })
      this.sendEmail(email,name,verified)
      res.redirect('/admin/userdisplay')
    }catch(error){
      console.log(error)
    }
  };

  static changepassword = async(req,res)=>{
    try{
      const {verified} = req.admin
        res.render('admin/changepassword',{ message3: req.flash('success'), message4: req.flash('error'),verified:verified})
    }catch(err){
        console.log(err)
    }
}
static updatepassword = async(req,res)=>{
    try{
        const {email,password,id,verified} = req.admin
        res.render('/changepassword',{verified:verified})
        const {oldpassword,newpassword,cpassword} =req.body
        if(oldpassword && newpassword && cpassword)
        {
            const user = await AdminModel.findById(id)
            const ismatch = await bcrypt.compare(oldpassword, user.password)
            if(!ismatch){
                req.flash("error", "oldpassword is incorrect.")
                return res.redirect('/changepassword')
            }else{
                if(newpassword != cpassword){
                    req.flash("error", "Pasword and confirm password do not match")
                    return res.redirect('/changepassword')
                }else{
                    const newHashpassword = await bcrypt.hash(newpassword,10)
                    await AdminModel.findByIdAndUpdate(id,{
                        $set: {password: newHashpassword}
                    })
                    req.flash("success", "password cahnged succesfully.please login with new password")
                }
                return res.redirect('/logout')
            }

        }else{

        }
    }catch(err){
        console.log(err)
    }
}

static profile = async(req,res) => {
  try{
    const {name ,image,verified} = req.admin;
    //console.log(image)
    res.render('admin/profile',{
      n:name,
      i:image,
      verified:verified,
      error: req.flash("error"),
    });
  }catch(error){
    console.log(error);
  }
};


static updateprofile = async (req,res) => {
  try{
    if(req.files){
      const {verified} = req.admin
      const admin = await AdminModel.findById(req.admin.id);
      const image_id = admin.image.public_id;
      await cloudinary.uploader.destroy(image_id);

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
        folder:"studentImage",
            });
            var data = {
              name: req.body.name,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url
              },
            };
    }else{
      var data ={
        name: req.body.name,
      }
    }
    const updateprofile = await AdminModel.findByIdAndUpdate(req.admin.id,data)
    res.redirect('admin/profile')
  }catch(error){
    console.log(error)
  }
};




                       
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  static userdisplay = async (req, res) => {
    try {
      const {verified} = req.admin
      const data = await AdminModel.find();
      res.render("admin/userdisplay", { d: data ,verified:verified});
    } catch (error) {
      console.log(error);
    }
  };
  static viewuser = async (req, res) => {
    try {
      const {verified} = req.admin
      const data = await AdminModel.findById(req.params.id);
      res.render("admin/viewuser", { item: data ,verified:verified});
    } catch (error) {
      console.log(error);
    }
  };

  static edituser = async (req, res) => {
    try {
      const {verified} = req.admin
      const data = await AdminModel.findById(req.params.id);
      res.render("admin/edituser", { item: data ,verified:verified});
    } catch (error) {
      console.log(error);
    }
  };

  static deleteuser = async (req, res) => {
    try {
      const user = await AdminModel.findById(req.params.id);
      await AdminModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/userdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static userupdate = async (req, res) => {
    try {
      const  user = await AdminModel.findById(req.params.id);
      const update = await AdminModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        verified:req.body.verified,
      });
      await update.save();
      res.redirect("/admin/userdisplay");
    } catch (error) {
      console.log(error);
    }
  };

};

module.exports = AdminController;

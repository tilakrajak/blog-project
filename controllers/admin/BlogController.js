const BlogModel = require("../../models/Blog");
const CategoryModel = require('../../models/Category')  ;
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dawjokma2",
  api_key: "927489688623582",
  api_secret: "PQMaqV7e_7S-jWKLwzRAecwP08g",
  //secure: true
});

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const {verified,id} = req.admin
      const data = await BlogModel.find({user_id:id}).sort({_id:-1});
      const category = await CategoryModel.find()
      //console.log(data);
      res.render("admin/blog/blogdisplay", { d: data,verified:verified,c:category });
    } catch (error) {
      console.log(error);
    }
  };

 

  static insertblog = async (req, res) => {
    try {
      const {id} = req.admin
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'blogImage'
      });
      const result = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user_id:id,
        author_name:req.admin.name,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        },
      });
      await result.save();
      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static viewblog = async (req, res) => {
    try {
      const {verified} = req.admin
      const result = await BlogModel.findById(req.params.id);
      res.render("admin/blog/viewblog", { view: result,verified:verified });
    } catch (error) {
      console.log(error);
    }
  };

  static editblog = async (req, res) => {
    try {
      const {verified} = req.admin
      const result = await BlogModel.findById(req.params.id);
      res.render("admin/blog/editblog", { edit: result ,verified:verified});
    } catch (error) {
      console.log(error);
    }
  };

  static blogUpdate = async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      const {verified} = req.admin
      await cloudinary.uploader.destroy(imageid);
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });

      const update = await BlogModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        category:req.body.category,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        },
      });
      await update.save();
      res.redirect("/admin/blogdisplay");
res.render('/admin/blogdisplay',{verified:verified})
    } catch (error) {
      console.log(error);
    }
  };

  static blogdelete = async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id);
      const imageid = blog.image.public_id;
      const {verified} = req.admin
      await cloudinary.uploader.destroy(imageid);
      await BlogModel.findByIdAndDelete(req.params.id);
   res.render("/admin/blogdisplay",{verified:verified})
      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static userblogAll = async (req, res) => {
    try {
      const {verified,id} = req.admin
      const data = await BlogModel.find().sort({_id:-1});
      //console.log(data);
      res.render("admin/blog/userblogAll", { d: data,verified:verified });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = BlogController;

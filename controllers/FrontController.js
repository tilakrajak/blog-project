const BlogModel = require("../models/Blog");
const CategoryModel = require("../models/Category");

class FrontController {
  static home = async (req, res) => {
    try {
      const blogs = await BlogModel.find().sort({ _id: -1 }).limit(6);
     
      res.render("home", { b: blogs });
    } catch (error) {
      console.log(error);
    }
  };

  

  static category = (req, res) => {
    res.render("category");
  };

  static about = (req, res) => {
    res.render("about");
  };

  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };
  static blog = async (req, res) => {
    try {
      const blogs = await BlogModel.find().sort({ _id: -1 });
      res.render("blog", { b: blogs });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash("success"),message2: req.flash('error') });
    } catch (error) {
      comsole.log(error);
    }
  };

 

  static blogDetail = async (req, res) => {
    try {
      const detail = await BlogModel.findById(req.params.id);
      const recentblogs = await BlogModel.find().limit(6);
      const category = await CategoryModel.find();
      res.render("blog-detail", { d: detail, r: recentblogs, c: category });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;

const CategoryModel = require('../../models/Category')  
class CategoryController{   
      
    static displaycategory = async (req, res) => {
        try {
          const {verified} = req.admin
          const data = await CategoryModel.find();
          res.render("admin/category/categorydisplay", { d: data,verified:verified });
        } catch (error) {
          console.log(error);
        }
      };

      static insertcategory = async (req, res) => {
        try {
          const result = new CategoryModel({
            catname: req.body.catname,
          });
          await result.save();
          res.redirect("/admin/categorydisplay");
        } catch (error) {
          console.log(error);
        }
      };

      static viewcategory = async (req, res) => {
        try {
          const {verified} = req.admin
          const result = await CategoryModel.findById(req.params.id);
          res.render("admin/category/viewcategory", { view: result,verified:verified });
        } catch (error) {
          console.log(error);
        }
      };


      static editcategory = async (req, res) => {
        try {
          const {verified} = req.admin
          const result = await CategoryModel.findById(req.params.id);
          res.render("admin/category/editcategory", { edit: result,verified:verified });
        } catch (error) {
          console.log(error);
        }
      };

      static categoryUpdate = async (req, res) => {
        try {
          const  category = await CategoryModel.findById(req.params.id);
          const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
            catname: req.body.catname,
          });
          await update.save();
          res.redirect("/admin/categorydisplay");
        } catch (error) {
          console.log(error);
        }
      };


      static categorydelete = async (req, res) => {
        try {
          const category = await CategoryModel.findById(req.params.id);
          await CategoryModel.findByIdAndDelete(req.params.id);
          res.redirect("/admin/categorydisplay");
        } catch (error) {
          console.log(error);
        }
      };
}
module.exports = CategoryController
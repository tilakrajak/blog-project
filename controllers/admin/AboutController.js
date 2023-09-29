const AboutModel = require('../../models/About')

class AboutController{

    static displayabout = async (req, res) => {
        try {
          const {verified} = req.admin
          const data = await AboutModel.find();
          res.render("admin/about/aboutdisplay", { d: data ,verified:verified});
        } catch (error) {
          console.log(error);
        }
      };


      static insertabout = async (req, res) => {
        try {
          const result = new AboutModel({
            about: req.body.about
          });
          await result.save();
          res.redirect("/admin/aboutdisplay");
        } catch (error) {
          console.log(error);
        }
      };

      static viewabout = async (req, res) => {
        try {
          const {verified} = req.admin
          const result = await AboutModel.findById(req.params.id);
          res.render("admin/about/viewabout", { view: result ,verified:verified});
        } catch (error) {
          console.log(error);
        }
      };


      static editabout = async (req, res) => {
        try {
          const {verified} = req.admin
          const result = await AboutModel.findById(req.params.id);
          res.render("admin/about/editabout", { edit: result, verified:verified });
        } catch (error) {
          console.log(error);
        }
      };

      static aboutUpdate = async (req, res) => {
        try {
          const  about = await AboutModel.findById(req.params.id);
          const {verified} = req.admin
          const update = await AboutModel.findByIdAndUpdate(req.params.id, {
            about: req.body.about,
          });
          await update.save();
          res.redirect("/admin/aboutdisplay");
          res.render('/admin/aboutdisplay',{verified:verified})
        } catch (error) {
          console.log(error);
        }
      };

      static aboutdelete = async (req, res) => {
        try {
          const {verified} = req.admin
          const about = await AboutModel.findById(req.params.id);
          await AboutModel.findByIdAndDelete(req.params.id);
          res.render('/admin/aboutdisplay',{verified:verified})
          res.redirect("/admin/aboutdisplay");
        } catch (error) {
          console.log(error);
        }
      };
}
module.exports = AboutController
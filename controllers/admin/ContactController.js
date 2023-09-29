const ContactModel = require('../../models/Contact')
class ContactController{

    static insertcontact = async (req, res) => {
        try {
          const insert = await new ContactModel({
            name: req.body.name,
            email: req.body.email,
            phoneno : req.body.phoneno,
            message : req.body.message,
          });
          await insert.save();
          res.redirect('/contact');
        } catch (error) {
          console.log(error);
        }
      };


      static displaycontact = async (req, res) => {
        try {
          const {verified} = req.admin
          const display = await ContactModel.find();
          res.render("admin/contact/contactdisplay", { d: display,verified:verified });
        } catch (error) {
          console.log(error);
        }
      };

}
module.exports = ContactController
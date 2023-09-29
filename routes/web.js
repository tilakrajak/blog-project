const express = require ('express')
const FrontController = require("../controllers/FrontController");
const AdminController = require('../controllers/admin/AdminController');
const BlogController = require('../controllers/admin/BlogController');
const CategoryController = require('../controllers/admin/CategoryController');
const AboutController = require('../controllers/admin/AboutController');
const ContactController = require('../controllers/admin/ContactController');
const auth = require('../middleware/auth');

const router = express.Router()
//frontcontroller
router.get('/',auth,FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/login',FrontController.login)
router.get('/blog-detail/:id',FrontController.blogDetail)

//admin  controller
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.get('/register',AdminController.register)
router.post('/admininsert',AdminController.admininsert)
router.get('/admin/changepassword',auth,AdminController.changepassword)
router.post('/updatepassword',auth,AdminController.updatepassword)
router.get('/admin/profile',auth,AdminController.profile)  
router.post('/updateprofile',auth,AdminController.updateprofile)
router.get('/logout',AdminController.logout)
router.post('/update_approve/:id',auth,AdminController.update_approve)
router.post('/verifylogin',AdminController.verifylogin)
router.get('/admin/userdisplay',auth,AdminController.userdisplay)
router.get('/admin/viewuser/:id',auth,AdminController.viewuser)
router.get('/admin/edituser/:id',auth,AdminController.edituser)
router.get('/admin/deleteuser/:id',auth,AdminController.deleteuser)
router.post('/admin/userupdate/:id',auth,AdminController.userupdate)

//blog controller
router.get('/admin/blogdisplay',auth,BlogController.displayBlog)
router.post('/insertblog',auth,BlogController.insertblog)
router.get('/admin/viewblog/:id',auth,BlogController.viewblog)
router.get('/admin/editblog/:id',auth,auth,BlogController.editblog)
router.post('/blogupdate/:id',auth,BlogController.blogUpdate)
router.get('/admin/blogdelete/:id',auth,BlogController.blogdelete)
router.get('/admin/userblogAll',auth,BlogController.userblogAll)



//category controller
router.get('/admin/categorydisplay',auth,CategoryController.displaycategory)
router.post('/insertcategory',auth,CategoryController.insertcategory)
router.get('/viewcategory/:id',auth,CategoryController.viewcategory)
router.get('/admin/editcategory/:id',auth,CategoryController.editcategory)
router.post('/categoryupdate/:id',auth,CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id',auth,CategoryController.categorydelete)

//about controller
router.get('/admin/aboutdisplay',auth,AboutController.displayabout)
router.post('/insertabout',auth,AboutController.insertabout)
router.get('/viewabout/:id',auth,AboutController.viewabout)
router.get('/admin/editabout/:id',auth,AboutController.editabout)
router.post('/aboutupdate/:id',auth,AboutController.aboutUpdate)
router.get('/admin/aboutdelete/:id',auth,AboutController.aboutdelete)

//contact conotroller
router.get('/admin/contactdisplay',auth,ContactController.displaycontact)
router.post('/insertcontact',ContactController.insertcontact)

module.exports = router
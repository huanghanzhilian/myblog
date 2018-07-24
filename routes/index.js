var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Article = require('../app/controllers/article');

var Admin=require('../app/controllers/admin');
var Comment=require('../app/controllers/comment');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {

  //pre handel user
  app.use(function(req, res, next) {
      var _user = req.session.user;
      //console.log(_user)
      app.locals.user = _user;
      return next();
  })


  // Index
  app.get('/', Index.index)

  //User
  app.get('/signup', User.showSignup);//注册页
  app.get('/signin', User.showSignin);//登录页
  app.get('/logout', User.logout)
  app.post('/user/signup', User.signup);
  app.post('/user/signin', User.signin);



  //article 文章相关
  app.get('/article/:id', Article.detail);//文章详情页



  app.get('/admin/home',User.signinRequired, User.adminRequired,Admin.adminIndex);//后台首页
  app.get('/admin/article/new',User.signinRequired, User.adminRequired, Admin.new);//后台文章录入页
  app.get('/admin/article/update/:id',User.signinRequired, User.adminRequired, Admin.update);//重新更新文章
  app.post('/admin/article/save', Admin.save);//后台文章录入页

  app.get('/admin/categorymanage',User.signinRequired, User.adminRequired, Admin.categorymanage);//后台文章分类管理
  app.get('/admin/categorymanage/add',User.signinRequired, User.adminRequired, Admin.categorymanageAdd);//后台文章分类管理添加
  app.get('/admin/categorymanage/update/:id',User.signinRequired, User.adminRequired, Admin.categorymanageUpdate);//后台文章分类更新名称
  app.post('/admin/categorymanage/save',User.signinRequired, User.adminRequired, Admin.categorymanageSave);//后台文章分类管理新建分类


  app.get('/admin/articlemanage',User.signinRequired, User.adminRequired, Admin.articlemanage);//后台文章管理
  


  // Comment
  app.post('/user/comment', User.signinRequired, Comment.save)


  // 404 page
  // app.use(function (req, res) {
  //   if (!res.headersSent) {
  //     res.status(404).render('404')
  //   }
  // })
}

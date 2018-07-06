var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

module.exports = function (app) {
  // Index
  app.get('/', Index.index)

  //User
  app.use('/signup', User.showSignup);//注册页
  app.use('/signin', User.showSignin);//登录页


  // 404 page
  // app.use(function (req, res) {
  //   if (!res.headersSent) {
  //     res.status(404).render('404')
  //   }
  // })
}

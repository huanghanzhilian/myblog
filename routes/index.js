var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Article = require('../app/controllers/article');

var Admin = require('../app/controllers/admin');
var Comment = require('../app/controllers/comment');
var Guestbook = require('../app/controllers/guestbook');
var Settings = require('../app/controllers/settings');
var About = require('../app/controllers/about');



module.exports = function(app) {

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
    app.get('/signup', User.showSignup); //注册页
    app.get('/signin', User.showSignin); //登录页
    app.get('/logout', User.logout)
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);


    // results
    app.get('/results', Index.search)


    //article 文章相关
    app.get('/article/:id', Article.detail); //文章详情页



    app.get('/admin/home', User.signinRequired, User.adminRequired, Admin.adminIndex); //后台首页
    app.get('/admin/article/new', User.signinRequired, User.adminRequired, Admin.new); //后台文章录入页
    app.get('/admin/article/update/:id', User.signinRequired, User.adminRequired, Admin.update); //重新更新文章
    app.post('/admin/article/save', Admin.save); //后台文章录入页

    app.get('/admin/categorymanage', User.signinRequired, User.adminRequired, Admin.categorymanage); //后台文章分类管理
    app.get('/admin/categorymanage/add', User.signinRequired, User.adminRequired, Admin.categorymanageAdd); //后台文章分类管理添加
    app.get('/admin/categorymanage/update/:id', User.signinRequired, User.adminRequired, Admin.categorymanageUpdate); //后台文章分类更新名称
    app.post('/admin/categorymanage/save', User.signinRequired, User.adminRequired, Admin.categorymanageSave); //后台文章分类管理新建分类


    app.get('/admin/articlemanage', User.signinRequired, User.adminRequired, Admin.articlemanage); //后台文章管理



    // Comment
    app.post('/user/comment', User.signinRequired, Comment.save); //评论文保存
    app.get('/admin/comment', User.signinRequired, User.adminRequired, Comment.manageComment); //一级评论管理页
    app.delete('/admin/comment/list', User.signinRequired, User.adminRequired, Comment.commentDel); //删除一级评论列表
    app.get('/admin/comment/children/:id', User.signinRequired, User.adminRequired, Comment.manageCommentCh); //二级评论管理页
    app.delete('/admin/commentch/list', User.signinRequired, User.adminRequired, Comment.commentDelCh); //删除二级评论列表


    //guestbook 留言
    app.get('/guestbook', Guestbook.showGuestbook); //留言页面
    app.post('/user/guestbook', User.signinRequired, Guestbook.save); //留言保存
    app.get('/admin/guestbook', User.signinRequired, User.adminRequired, Guestbook.manageGuestbook); //一级留言管理页
    app.delete('/admin/guestbook/list', User.signinRequired, User.adminRequired, Guestbook.guestbookDel); //删除一级留言列表
    app.get('/admin/guestbook/children/:id', User.signinRequired, User.adminRequired, Guestbook.manageGuestbookCh); //二级留言管理页
    app.delete('/admin/guestbookch/list', User.signinRequired, User.adminRequired, Guestbook.guestbookDelCh); //删除二级留言列表

    //settings 系统设置
    app.get('/admin/settings', User.signinRequired, User.adminRequired, Settings.showSettings); //系统设置页
    app.post('/admin/saveSettings', User.signinRequired, Settings.savePoster, Settings.saveSettings); //系统设置保存

    //关于本站
    app.get('/admin/about', User.signinRequired, User.adminRequired, About.manageAbout); //后台关于本站设置
    app.post('/admin/about/save', User.signinRequired, User.adminRequired, About.save); //后台关于本站设置提交修改
    app.get('/about', About.showAbout); //后台关于本站设置



    // catch 404 and forward to error handler
    // app.use(function(req, res, next) {
    //     var err = new Error();
    //     err.status = 404;
    //     next(err);
    // });
    // app.use(function(err,req, res, next) {
    //   console.log('================')
    //   //console.log(err)
    //   res.status(404);
    //   res.send('Sorry cant find that!');
    // });

    // 404 page
    // app.use(function (req, res) {
    //   if (!res.headersSent) {
    //     res.status(404).render('404')
    //   }
    // })
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    // error handlers
    app.use(function(err, req, res, next) {
        // console.log('=============')
        // console.log(err)
        var code = err.status || 500,
        message = code === 404 ? '请求的页面已失联~系统已自动记录该错误。' : '服务器出现故障';
        res.render('web/error', {
            code: code,
            message: message
        });
    });
}
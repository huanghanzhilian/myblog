var Article = require('../../models/article.js'); // 载入mongoose编译后的模型article

// admin page 首页
exports.adminIndex = function(req, res) {
    res.render('admin/index', {
        title: '后台管理',
    })
}
// admin new page 后台录入页
exports.new = function(req, res) {
    res.render('admin/newArticle', {
        title: '文章录入页'
    });
};

// admin post article 后台录入提交  文章的保存
exports.save = function(req, res) {
    console.log(req.body)
    // var articleObj = req.body.article || "";
    // var _article = null;
    // 新加的文章
    //_movie = new Article(articleObj);
    res.json({a:1});
};


// admin categorymanage page 后台文章分类管理
exports.categorymanage = function(req, res) {
    res.render('admin/categorymanage', {
        title: '文章分类管理'
    });
};
// admin articlemanage page 后台文章管理
exports.articlemanage = function(req, res) {
    res.render('admin/articlemanage', {
        title: '文章管理'
    });
};


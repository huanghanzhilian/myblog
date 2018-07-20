var multer = require('multer');
var Article = require('../../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../../models/category');

const md = require('markdown-it')();

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
    // res.json({ a: md.render(req.body.comtent)});
    // return

    var articleObj = req.body.article || "";
    var category=articleObj.category;
    var _article = null;
    // 新加的文章
    _article = new Article(articleObj);
    _article.save(function(err, article) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/articlemanage');

        return
        console.log(article)
        res.json({ a: '添加成功'});
        // if(category){
        //     //新增视频标签
        //     var category=new Category({
        //         name:categoryName,
        //         articles:[article._id]
        //     });
        //     category.save(function(err, category) {
        //         article.category = category._id
        //         article.save(function(err, article) {
        //         	res.json({ a: '添加成功',b:article._id});
        //             // res.redirect('/movie/' + movie._id)
        //         })
        //     })
        // }
    })
    //res.json({ a: '添加成功' });
};


// admin categorymanage page 后台文章分类管理
exports.categorymanage = function(req, res) {
    res.render('admin/categorymanage', {
        title: '文章分类管理'
    });
};
// admin articlemanage page 后台文章管理
exports.articlemanage = function(req, res) {
    Article.fetch(function(err, article) {
        if (err) {
            console.log(err);
        }
        res.render('admin/articlemanage', {
            title: '文章管理',
            articles: article
        });
    });
};
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
//后台录入页
exports.new = function(req, res) {
    Category.find({}, function(err, categories) {
        res.render('admin/newArticle', {
            title: '文章录入页',
            categories: categories
        })
    })
};

//后台录入提交  文章的保存
exports.save = function(req, res) {
    console.log(req.body)
    var articleObj = req.body.article || "";
    var categoryId=articleObj.categoryid;
    var _article = null;
    if(!categoryId){
        res.redirect('/admin/article/new');
        return;
    }
    // 新加的文章
    _article = new Article(articleObj);
    _article.save(function(err, article) {
        if (err) {
            console.log(err);
        }
        Category.findById(categoryId, function(err, category) {
            category.articles.push(article._id);
            category.save(function(err, category) {
                res.redirect('/admin/articlemanage');
            })
        })
    })
};


//后台文章分类管理
exports.categorymanage = function(req, res) {
    Category.fetch(function(err, categorys) {
        if (err) {
            console.log(err);
        }
        res.render('admin/categorymanage', {
            title: '文章分类管理',
            categorys: categorys
        });
    });
};
//后台文章分类管理添加
exports.categorymanageAdd = function(req, res) {
    res.render('admin/categorymanageAdd', {
        title: '添加分类'
    });
};

//后台文章分类管理新建分类
exports.categorymanageSave = function(req, res) {
    var categoryName=req.body.categoryname;
    var _category = null;
    var category=new Category({
        name:categoryName,
        articles:[]
    });
    category.save(function(err, category) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/categorymanage')
    })
};






// admin articlemanage page 后台文章管理
exports.articlemanage = function(req, res) {
    // Article
    //     .find({})
    //     .populate({
    //         path: 'articles',
    //         select: 'name'
    //     })
    //     .exec(function(err, articles) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         res.json(articles)
    //     })
    // Category
    //     .find({})
    //     .populate({
    //         path: 'articles',
    //         select: 'title'
    //     })
    //     .exec(function(err, articles) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         res.json(articles)
    //     })

        //return
    Article.fetch(function(err, article) {
        if (err) {
            console.log(err);
        }
        console.log(article)



        // Category.findById(category, function(err, category) {
        //     category.articles.push(article._id);
        //     category.save(function(err, category) {
        //         res.redirect('/admin/articlemanage');
        //     })
        // })
        res.render('admin/articlemanage', {
            title: '文章管理',
            articles: article
        });
    });
};
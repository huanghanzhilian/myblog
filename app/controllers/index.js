var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');

const md = require('markdown-it')();

// index page 首页
exports.index = function(req, res) {
    Article.find()
        .populate('categoryid', 'name')
        .exec(function(err, articles) {
            Category.fetch(function(err, categorys) {
                if (err) {
                    console.log(err);
                }
                // res.render('admin/categorymanage', {
                //     title: '文章分类管理',
                //     categorys: categorys
                // });
                console.log(categorys)
                res.render('web/index', {
                    title: '首页',
                    articles: articles,
                    categorys:categorys
                });
            });
            
        })


	// Article.fetch(function(err, article) {
 //        if (err) {
 //            console.log(err);
 //        }
 //        res.render('web/index', {
 //            title: '首页',
 //            articles: article
 //        });
 //    });
    // res.render('web/index', {
    //     title: '首页',
    // })
    //res.send('首页')
}


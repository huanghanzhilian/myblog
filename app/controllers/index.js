var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');

const md = require('markdown-it')();

// index page 首页
exports.index = function(req, res) {
	Article.fetch(function(err, article) {
        if (err) {
            console.log(err);
        }
        res.render('web/index', {
            title: '首页',
            articles: article
        });
    });
    // res.render('web/index', {
    //     title: '首页',
    // })
    //res.send('首页')
}


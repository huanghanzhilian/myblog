var About = require('../models/about');

var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');
var Comment = require('../models/comment');
var Settings = require('../models/settings');

const md = require('markdown-it')();
var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段

// 关于本站展示
exports.showAbout = function(req, res) {
    About
        .find({})
        .exec(function(err, about) {
            Promise.all([
                    Article.find({}, null, { limit: 5, sort: { _id: -1 } }).populate('categoryid', 'name').exec(), //获取最新文章
                    Category.find().exec(), //获取所有分类
                    Article.find({}, null, { limit: 5, sort: { pv: -1 } }).populate('categoryid', 'name').exec(), //获取最热文章
                    Comment.find({}, null, { limit: 5, sort: { _id: -1 } }) //获取最新评论文章
                    .populate('article', 'title')
                    .populate('from', 'name')
                    .populate('reply.to reply.from', 'name'),
                    Settings.find({})
                ])
                .then(function(data) {
                    var newests = data[0]; //获取最新文章
                    var categorys = data[1]; //获取所有分类
                    var hottests = data[2]; //获取最热文章
                    var newComments = data[3]; //获取最新评论文章
                    var settings = data[4][0] || {}; //得到网站配置信息
                    if(about.length&&about[0].content){
                        about[0].content=md.render(about[0].content);
                    }
                    res.render('web/about', {
                        title: '关于本站',
                        about: about[0] || {},
                        categorys: categorys,
                        newests: newests,
                        hottests: hottests,
                        newComments: newComments,
                        config: settings, //得到网站配置信息
                    });
                });
        })

};

//管理关于本站
exports.manageAbout = function(req, res) {
    About.find({}, function(err, about) {
        res.render('admin/manageAbout', {
            title: '本站设置',
            about: about[0] || {}
        });
    })
};

//编辑关于本站
exports.save = function(req, res) {
    var aboutObj = req.body.about || "";
    var _about = null;
    About.find({}, function(err, about) {
        if (err) {
            console.log(err)
        }
        if (about.length) {
            _about = _underscore.extend(about[0], aboutObj); // 用新对象里的字段替换老的字段
            about[0].save(function(err, about) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/about');
            })
        } else {
            var aboutOne = new About(aboutObj);
            aboutOne.save(function(err, about) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/about');
            })
        }
    })
};
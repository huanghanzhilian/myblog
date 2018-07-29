var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');
var Comment = require('../models/comment');

var Promise=require('bluebird')
const md = require('markdown-it')();

// index page 首页
exports.index = function(req, res) {
    Promise.all([
      Article.find({},null,{sort:{_id:-1}}).populate('categoryid', 'name').exec(),
      Category.find().exec(),
      Article.find({},null,{limit: 5,sort:{pv:-1}}).populate('categoryid', 'name').exec(),
      Comment.find({},null,{limit: 5,sort:{_id:-1}})
            .populate('article', 'title')
            .populate('from', 'name')
            .populate('reply.to reply.from', 'name')
    ])
    .then(function(data) {
      //console.log(data[0])
      var articles = data[0];
      var categorys = data[1];
      var newests = articles.slice(0, 5);
      var hottests=data[2];
      var newComments=data[3];
      res.render('web/index', {
          title: '首页',
          articles: articles,
          categorys:categorys,
          newests:newests,
          hottests:hottests,
          newComments:newComments
      });
    })


}


var moment = require('moment');
var Promise=require('bluebird')

var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');
var Comment = require('../models/comment');

const md = require('markdown-it')();

// detail page 文章详情页
exports.detail = function(req, res) {
	var id = req.params.id;
	//每次访问更新pv
    Article.update({_id: id}, {$inc: {pv: 1}}, function(err) {
        if (err) {
            console.log(err)
        }
    })
    Article.findById(id)
    	.populate('categoryid', 'name')
        .exec(function(err, article) {
            if (err) {
                console.log(err)
            }
            Comment
            .find({article: id})
            .populate('from', 'name')
            .populate('reply.to reply.from', 'name')
            .exec(function(err, comments) {
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
                  // res.render('web/index', {
                  //     title: '首页',
                  //     articles: articles,
                  //     categorys:categorys,
                  //     newests:newests,
                  //     hottests:hottests
                  // });
                  article.content=md.render(article.content);
                  res.render('web/article', {
                      createAt:moment(article.meta.createAt).format("YYYY-MM-DD"),
                      title: article.title,
                      content: article.content,
                      contentType:article.categoryid.name,
                      article:article,
                      comments: comments,

                      articles: articles,
                      categorys:categorys,
                      newests:newests,
                      hottests:hottests,
                      newComments:newComments
                  });

                })


                  
            })
        })


	// Article.findById(id, function(err, movie) {
 //        Comment
 //        .find({movie: id})
 //        .populate('from', 'name')
 //        .populate('reply.to reply.from', 'name')
 //        .exec(function(err, comments) {
 //            console.log(comments)
 //            res.render('detail', {
 //                title: 'i_movie' + movie.title,
 //                movie: movie,
 //                comments: comments
 //            });
 //        })
 //    });



	// console.log(req.params)
	// console.log(req.query)
    
};



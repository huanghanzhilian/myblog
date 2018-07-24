var moment = require('moment');

var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');

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
            console.log(article)
            article.content=md.render(article.content);
			res.render('web/article', {
				createAt:moment(article.meta.createAt).format("YYYY-MM-DD"),
	            title: article.title,
	            content: article.content,
	            contentType:article.categoryid.name,
	            article:article
	        });
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



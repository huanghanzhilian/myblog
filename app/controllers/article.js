var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');

const md = require('markdown-it')();

// detail page 文章详情页
exports.detail = function(req, res) {
	var id = req.params.id;
	Article.findById(id, function(err, article) {
		if (err) {
            console.log(err);
        }
        article.content=md.render(article.content);
		res.render('web/article', {
            title: article.title,
            content: article.content
        });
    });
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



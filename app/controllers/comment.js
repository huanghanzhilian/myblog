var Comment = require('../models/comment'); // 载入mongoose编译后的模型comment

// comment
exports.save = function(req, res) {
    var _comment = req.body.comment
    var articleId = _comment.article
    //通过参数判断是否为一级评论还hi二级评论
    if(_comment.cid){
    	Comment.findById(_comment.cid, function(err, comment) {
    		var reply={
    			from:_comment.from,
    			to:_comment.tid,
    			content:_comment.content
    		}
    		comment.reply.push(reply);
    		comment.save(function(err, comment) {
    			if (err) {
		            console.log(err);
		        }
		        res.redirect('/article/' + articleId);
    		})
    	})
    }else{
    	var comment = new Comment(_comment);
	    comment.save(function(err, comment) {
	        if (err) {
	            console.log(err);
	        }
	        res.redirect('/article/' + articleId);
	    });
    }
};
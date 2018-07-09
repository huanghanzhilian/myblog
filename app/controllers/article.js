// detail page 文章详情页
exports.detail = function(req, res) {
	console.log(req.params)
	console.log(req.query)
    // res.render('detail', {
    //     title: '文章详情'
    // });
    res.send('文章详情页')
};

// admin new page 后台录入页
exports.new = function(req, res) {
	res.render('admin/newArticle', {
		title: '后台录入页'
	});
};


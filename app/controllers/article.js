// detail page 文章详情页
exports.detail = function(req, res) {
	console.log(req.params)
	console.log(req.query)
    // res.render('detail', {
    //     title: '文章详情'
    // });
    res.send('文章详情页')
};



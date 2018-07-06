// showSignup
exports.showSignup = function(req, res) {
	// res.render('signup', { //视图views
	// 	title: '注册页面'
	// });
	res.send('注册页面')
};

// showSignin
exports.showSignin = function(req, res) {
	// res.render('signin', { //视图views
	// 	title: '登入页面'
	// });
	res.send('登入页面')
};

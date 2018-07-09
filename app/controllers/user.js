// showSignup
exports.showSignup = function(req, res) {
	res.render('web/signup', {
		title: '注册页面'
	});
};

// showSignin
exports.showSignin = function(req, res) {
	res.render('web/signin', {
		title: '登入页面'
	});
	//res.send('登入页面')
};

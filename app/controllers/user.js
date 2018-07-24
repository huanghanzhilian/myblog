var User = require('../models/user.js'); // 载入mongoose编译后的模型user

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


//signup 注册
//post参数第一个路由，第二个回掉方法
//回掉方法参数request请求
//回掉方法参数response响应体
exports.signup = function(req, res) {
	//获取表单数据
	var _user = req.body.user;
	//查找输入用户名是否已存在
	User.findOne({
		name: _user.name
	}, function(err, user) {
		if (err) {
			console.log(err)
		}

		if (user) {
			console.log('账户存在')
			return res.redirect('/signin');
		} else {
			//生成用户数据
			var user = new User(_user);
			//保存数据方法
			user.save(function(err, user) {
				if (err) {
					console.log(err)
				}
				//重定向到首页
				res.redirect('/');
			})
		}
	})
}

//signin
exports.signin = function(req, res) {
	//拿到表单提交的user
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	//查询数据库是否有该用户
	User.findOne({
		name: name
	}, function(err, user) {
		if (err) {
			console.log(err)
		}
		if (!user) {
			return res.redirect('/signup');
		}
		//匹配密码
		//用户提交的密码是明文的数据库是加密后的密码所以这个时候需要调用这个user实例上的方法
		//传入当前密码，拿到一个回掉的方法
		//isMatch通过他看是否匹配正确
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				console.log(err)
			}
			if (isMatch) {
				req.session.user = user;
				return res.redirect('/')
			} else {
				console.log('密码错误不匹配')
				return res.redirect('/signin')
			}
		})
	})
}

//logout
exports.logout = function(req, res) {
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/')
}

// midware for user  是否登入
exports.signinRequired = function(req, res, next) {
		var user = req.session.user
		if (!user) {
			return res.redirect('/signin')
		}
		next()
	}
//是否是管理员
exports.adminRequired = function(req, res, next) {
	var user = req.session.user
	if (user.role <= 10) {
		return res.redirect('/signin')
	}
	next()
}
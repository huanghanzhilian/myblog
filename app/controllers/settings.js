var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// 系统设置页
exports.showSettings = function(req, res) {
    res.render('admin/settings', {
        title: '系统设置'
    });
};

//系统设置保存
exports.saveSettings = function(req, res) {
    console.log(req.body)
    console.log(req.file)
    res.json(req.body);
};

//系统设置保存
exports.test = function(req, res) {
    res.render('admin/test', {
        title: '系统设置'
    });
};
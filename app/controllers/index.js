// index page 首页
exports.index = function(req, res) {
    res.render('web/index', {
        title: '首页',
    })
    //res.send('首页')
}
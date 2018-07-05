/*
* @Author: macintoshhd
* @Date:   2018-05-25 16:59:26
* @Last Modified by:   huanghanzhilian
* @Last Modified time: 2018-07-05 23:49:31
*/


var express = require('express');   
var app = express();
var port = process.env.PORT || 3004; // 设置端口号：3004


//app.set('view engine', 'html');
var saker = require('saker');
saker.config({
    defaultLayout: './shared/layout.html',
    partialViewDir: './views/shared/'
});
app.engine('html', saker.renderView);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
app.get('/', function(req, res){
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port); // 监听 port[3004]端口
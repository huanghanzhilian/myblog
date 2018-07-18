const path = require('path');//路径
const express = require('express');//web框架
var port = process.env.PORT || 3001; // 设置端口号：3001
var mongoose = require('mongoose'); // 加载mongoose模块
var dbUrl = 'mongodb://localhost:27017/huangblog';
mongoose.connect(dbUrl); // 连接mongodb本地数据库imovie
console.log('MongoDB connection success!');

const routes = require('./routes')
const pkg = require('./package')

const app = express()
// 设置模板目录
app.set('views', path.join(__dirname, './app/views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))


// 路由
require('./routes')(app);
// 监听端口，启动程序
app.listen(port, function () {
  console.log('listening on port'+port)
})
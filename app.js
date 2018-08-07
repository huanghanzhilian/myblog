const path = require('path');                                             //路径
const express = require('express');                                       //web框架

const bodyParser = require('body-parser');
const mongoose = require('mongoose');                                     // 加载mongoose模块
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);                     //会话持久
const logger=require('morgan');                                           //日志中间件

var port = process.env.PORT || 3001; // 设置端口号：3001

var dbUrl = 'mongodb://blog:blog@127.0.0.1:19999/huangblog';
var env = process.env.NODE_ENV|| 'development'

if(env==='development'){
    dbUrl = 'mongodb://localhost:27017/huangblog';
}

const routes = require('./routes')
const pkg = require('./package')

mongoose.connect(dbUrl); // 连接mongodb本地数据库imovie
console.log('MongoDB connection success!');

const app = express()


// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({
    extended: true
}));
// 设置模板目录
app.set('views', path.join(__dirname, './app/views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
//session依赖于cookies
app.use(cookieParser());
app.use(session({
    secret: 'huang',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));

//app.use(logger('short'));
if('development'===app.get('env')){
    app.set('showStackError',true);//打印错误信息
    app.use(logger(':method :url :status'))//中间件
    app.locals.pretty=true;//格式化代码
    mongoose.set('debug',true)//数据库日志
}

// 路由
require('./routes')(app);
// 监听端口，启动程序
app.listen(port, function () {
  console.log('listening on port'+port)
})
app.locals.moment = require('moment'); // 载入moment模块，格式化日期
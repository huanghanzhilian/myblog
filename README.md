# myblog
基于 Node.js 的个人开源博客系统，采用响应式布局，支持移动设备直接访问，功能全面，美观大方。



# 目录结构

对应文件及文件夹的用处：

1. `models`: 存放操作数据库的文件
2. `public`: 存放静态文件，如样式、图片等
3. `routes`: 存放路由文件
4. `views`: 存放模板文件
5. `index.js`: 程序主文件
6. `package.json`: 存储项目名、描述、作者、依赖等等信息


# 安装依赖模块

对应模块的用处

1. `express`: web 框架
2. `ejs`: 模板
3. `mongoose`: MongoDB对象建模设计异步环境中工作
4. `markdown-it`: 编辑器转化
5. `body-parser`: 将表单里的数据进行格式化
6. `multer`: 图片上传组件 表单基于 multipart/form-data 类型
7. `underscore`: `_.extend`用新对象里的字段替换老的字段
8. `moment`: 时间格式化

1. `express-session`: session 中间件
1. `connect-mongo`: 将 session 存储于 mongodb，结合 express-session 使用

1. `config-lite`: 读取配置文件

# 配置文件

config/default.js

```
module.exports = {
  port: 3001,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
```

配置释义：

1. port: 程序启动要监听的端口号
2. session: express-session 的配置信息，后面介绍
3. mongodb: mongodb 的地址，以 mongodb:// 协议开头，myblog 为 db 名


# 功能设计与路由设计

**博客前台**

- 登录
	1. 登录页：GET /signin
	2. 登录：POST /user/signin
- 注册页
	1. 注册页：GET /signup
	2. 注册：POST /user/signup
- 文章列表页
- 文章详情页




# 知识点
nodejs Express 4.x req.body req.query req.params 三种获取参数的方法

第一种情况：http://localhost:3000/testparams/lixing，服务端代码这样写：

router.get('/testparams/:anything', function (req, res) {
res.send('anything is : ' + req.params.anything);
})//这里的anything指的是你可以任意命名，以便使用req.params.XX获取参数

在浏览器输入请求路径后页面返回：anything is : lixing
 

第二种情况：http://localhost:3000/?id=1,用req.query.id,我们会得到 1，如果有两个或以上参数，用 & 连接，如：/?id=1&name=test,

                 获取参数则是：req.query.id --> 1 , req.query.name - -> test .

今天遇到一个情况，就是前端用JQuery get方法带参数请求，我这边获取的时候由于用的同一段获取的代码，req.query，

取到的req.query 的值 :GET /tower?projectID=1&projectDeviceID=cfcf3d22-2d49-43aa-a607-9919c87700fa&ticket=0

第三种情况：用Post方法向node服务器发送数据 id = 1，post('/login', {name: lixing})，node端获取参数则应该是：req.body.name.

 

官网介绍：

Checks route params (req.params), ex: /user/:id
Checks query string params (req.query), ex: ?id=12
Checks urlencoded body params (req.body), ex: id=


# 数据更新
db.users.update({name:"admin"},{$set:{role:50}})



### mongoose操作

```
XXX.find({},null,{skip: 0, limit: 20, sort:{ "-createtime":1}}, function() {...});   

Model.find(conditions, [fields], [options], [callback])
```


### 并发测试
ab -n1000 -c10 http://localhost:3001/

疑问

cookie
session
会话持久

密码存储设计
bcrypt


最新文章

搜索功能                           完成
分类列表页                         完成
关于本站页
文章评论功能                       完成
文章评论管理                       完成
系统设置
留言功能                           完成
留言管理                           完成

后台赛选功能
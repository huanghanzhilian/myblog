var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');
var Comment = require('../models/comment');

var Promise = require('bluebird')
const md = require('markdown-it')();
// index page 首页
exports.index = function(req, res) {
    //拿到页码
    var page = parseInt(req.query.p, 10) || 1;
    var count = 2;//每一页只展示两条数据
    var index = (page-1) * count

    Promise.all([
            Article.find({}, null, { sort: { _id: -1 } }).populate('categoryid', 'name').exec(),
            Category.find().exec(),
            Article.find({}, null, { limit: 5, sort: { pv: -1 } }).populate('categoryid', 'name').exec(),
            Comment.find({}, null, { limit: 5, sort: { _id: -1 } })
            .populate('article', 'title')
            .populate('from', 'name')
            .populate('reply.to reply.from', 'name')
        ])
        .then(function(data) {
            //console.log(data[0])
            var articles = data[0];
            var categorys = data[1];
            var newests = articles.slice(0, 5);
            var hottests = data[2];
            var newComments = data[3];


            var results = articles.slice(index, index + count);
            var totalPage= Math.ceil(articles.length / count);//总页数
            var hasPreviousPage=page!=1?true:false;//是否有上一页
            var hasNextPage=page<totalPage;//是否有下一页
            var prePage=page==1||page>totalPage?0:page-1;
            var nextPage=page>=totalPage?0:page+1;

            res.render('web/index', {
                title: '首页',

                categorys: categorys,
                newests: newests,
                hottests: hottests,
                newComments: newComments,

                articles: results,
                pageNow:page,
                pageSize:count,
                recordAmount:articles.length,
                totalPage: totalPage,
                hasPreviousPage:hasPreviousPage,
                hasNextPage:hasNextPage,
                prePage:prePage,
                nextPage:nextPage,
            });
        })


}
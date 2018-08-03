var Article = require('../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../models/category');
var Comment = require('../models/comment');
var Settings = require('../models/settings');

var Promise = require('bluebird')
const md = require('markdown-it')();
// index page 首页
exports.index = function(req, res) {
    //拿到页码
    var page = parseInt(req.query.p, 10) || 1;
    var count = 20;//每一页只展示两条数据
    var index = (page-1) * count

    Promise.all([
            Article.find({}, null, { sort: { _id: -1 } }).populate('categoryid', 'name').exec(),
            Category.find().exec(),
            Article.find({}, null, { limit: 5, sort: { pv: -1 } }).populate('categoryid', 'name').exec(),
            Comment.find({}, null, { limit: 5, sort: { _id: -1 } })
            .populate('article', 'title')
            .populate('from', 'name')
            .populate('reply.to reply.from', 'name'),
            Settings.find({})
        ])
        .then(function(data) {
            //console.log(data[0])
            var articles = data[0];
            var categorys = data[1];
            var newests = articles.slice(0, 5);
            var hottests = data[2];
            var newComments = data[3];
            var settings = data[4][0]||{};//得到网站配置信息

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

                config: settings,//得到网站配置信息
            });
        })


}



// search page
exports.search = function(req, res) {
    //拿到搜索关键字
    var q = req.query.q
    //拿到分类id
    var catId = req.query.cat;



    //拿到页码
    var page = parseInt(req.query.p, 10) || 1;
    var count = 20;//每一页只展示两条数据
    var index = (page-1) * count


    if (catId) {
        Category
            .find({
                _id: catId
            })
            .populate({
                path: 'articles',
                select: 'title',
                /*options: {
                    limit: 2,
                    skip:index
                }*/
            })
            .exec(function(err, articlesbox) {
                if (err) {
                    console.log(err)
                }
                Promise.all([
                    Category.find().exec(),
                    Article.find({}, null, { limit: 5, sort: { pv: -1 } }).populate('categoryid', 'name').exec(),
                    Comment.find({}, null, { limit: 5, sort: { _id: -1 } })
                    .populate('article', 'title')
                    .populate('from', 'name')
                    .populate('reply.to reply.from', 'name'),
                    Settings.find({})
                ])
                .then(function(data) {
                    var articles=articlesbox[0].articles;
                    var categorys = data[0];
                    var newests = articles.slice(0, 5);
                    var hottests = data[1];
                    var newComments = data[2];
                    var settings = data[3][0]||{};//得到网站配置信息


                    var results = articles.slice(index, index + count);
                    console.log(results)
                    console.log(results.length)

                    var totalPage= Math.ceil(articles.length / count);//总页数
                    var hasPreviousPage=page!=1?true:false;//是否有上一页
                    var hasNextPage=page<totalPage;//是否有下一页
                    var prePage=page==1||page>totalPage?0:page-1;
                    var nextPage=page>=totalPage?0:page+1;

                    res.render('web/results', {
                        title: '结果列表页面',

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

                        config: settings,//得到网站配置信息
                    });
                })
            })
    } else {

        Promise.all([
            Article.find({
                title: new RegExp(q + '.*', 'i')
            }, null, { sort: { _id: -1 } }).populate('categoryid', 'name').exec(),
            Category.find().exec(),
            Article.find({}, null, { limit: 5, sort: { pv: -1 } }).populate('categoryid', 'name').exec(),
            Comment.find({}, null, { limit: 5, sort: { _id: -1 } })
            .populate('article', 'title')
            .populate('from', 'name')
            .populate('reply.to reply.from', 'name'),
            Settings.find({})
        ])
        .then(function(data) {
            var articles = data[0];
            var categorys = data[1];
            var newests = articles.slice(0, 5);
            var hottests = data[2];
            var newComments = data[3];
            var settings = data[4][0]||{};//得到网站配置信息



            var results = articles.slice(index, index + count);
            var totalPage= Math.ceil(articles.length / count);//总页数
            var hasPreviousPage=page!=1?true:false;//是否有上一页
            var hasNextPage=page<totalPage;//是否有下一页
            var prePage=page==1||page>totalPage?0:page-1;
            var nextPage=page>=totalPage?0:page+1;

            res.render('web/results', {
                title: '结果列表页面',

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

                config: settings,//得到网站配置信息
            });
        })

    }

}
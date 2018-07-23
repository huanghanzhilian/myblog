var multer = require('multer');
var _underscore = require('underscore'); // _.extend用新对象里的字段替换老的字段

var Article = require('../../models/article.js'); // 载入mongoose编译后的模型article
var Category = require('../../models/category');

const md = require('markdown-it')();

// admin page 首页
exports.adminIndex = function(req, res) {
    res.render('admin/index', {
        title: '后台管理',
    })
}
//后台录入页
exports.new = function(req, res) {
    Category.find({}, function(err, categories) {
        res.render('admin/newArticle', {
            title: '文章录入页',
            articles: {},
            categories: categories
        })
    })
};

// 后台文章更新页
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Article.findById(id, function(err, article) {
            Category.find({}, function(err, categories) {
                res.render('admin/newArticle', {
                    title: '文章更新',
                    articles: article,
                    categories:categories
                });
            })
        });
    }
};

//后台录入提交  文章的保存
exports.save = function(req, res) {
    var id = req.body.article._id || "";
    var articleObj = req.body.article || "";
    var categoryId=articleObj.categoryid;
    var _article = null;
    if(!categoryId){
        res.redirect('/admin/article/new');
        return;
    }
    // 已经存在的数据
    if(id){
        Article.findById(id, function(err, article) {
            if (err) {
                console.log(err);
            }
            _article = _underscore.extend(article, articleObj); // 用新对象里的字段替换老的字段
            _article.save(function(err, article) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/articlemanage');
            });
        });
    }else{
        // 新加的文章
        _article = new Article(articleObj);
        _article.save(function(err, article) {
            if (err) {
                console.log(err);
            }
            Category.findById(categoryId, function(err, category) {
                category.articles.push(article._id);
                category.save(function(err, category) {
                    res.redirect('/admin/articlemanage');
                })
            })
        })
    }
};


//后台文章分类管理
exports.categorymanage = function(req, res) {
    Category.fetch(function(err, categorys) {
        if (err) {
            console.log(err);
        }
        res.render('admin/categorymanage', {
            title: '文章分类管理',
            categorys: categorys
        });
    });
};
//后台文章分类管理添加
exports.categorymanageAdd = function(req, res) {
    res.render('admin/categorymanageAdd', {
        title: '添加分类',
        category:{}
    });
};
//分类修改名称
exports.categorymanageUpdate = function(req, res) {
    var id = req.params.id;
    if (id) {
        Category.findById(id, function(err, category) {
            res.render('admin/categorymanageAdd', {
                title: '修改分类',
                category:category
            });
        });
    }

};

//后台文章分类管理新建分类
exports.categorymanageSave = function(req, res) {
    var id = req.body._id || "";
    var categoryName=req.body.categoryname;
    var _category = null;

    if(id){
        Category.findById(id, function(err, category) {
            if (err) {
                console.log(err);
            }
            var categoryObj={
                _id:id,
                name:categoryName
            }
            _category = _underscore.extend(category, categoryObj); // 用新对象里的字段替换老的字段
            _category.save(function(err, category) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/categorymanage')
            });
        });
    }else{
        var category=new Category({
            name:categoryName,
            articles:[]
        });
        category.save(function(err, category) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/categorymanage')
        })
    }
};






// admin articlemanage page 后台文章管理
exports.articlemanage = function(req, res) {
    //拿到页码
    var page = parseInt(req.query.p, 10) || 1;
    var count = 1;//每一页只展示两条数据
    var index = (page-1) * count

    Article.find()
        .populate('categoryid', 'name')
        .exec(function(err, articles) {
            if (err) {
                console.log(err)
            }
            var results = articles.slice(index, index + count);
            var totalPage= Math.ceil(articles.length / count);//总页数
            var hasPreviousPage=page!=1?true:false;//是否有上一页
            var hasNextPage=page<totalPage;//是否有下一页
            var prePage=page==1||page>totalPage?0:page-1;
            var nextPage=page>=totalPage?0:page+1;
            console.log({
                title: '文章管理',
                articles: results,
                pageNow:page,
                pageSize:count,
                recordAmount:articles.length,
                totalPage: totalPage,
                hasPreviousPage:hasPreviousPage,
                hasNextPage:hasNextPage,
                prePage:prePage,
                nextPage:nextPage,
            })
            res.render('admin/articlemanage', {
                title: '文章管理',
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
            // res.json({
            //     title: '文章管理',
            //     articles: results,
            //     pageNow:page,
            //     pageSize:count,
            //     recordAmount:articles.length,
            //     totalPage: totalPage,
            //     hasPreviousPage:hasPreviousPage,
            //     hasNextPage:hasNextPage,
            //     prePage:prePage,
            //     nextPage:nextPage,
            // });
        })
};
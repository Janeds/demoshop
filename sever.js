var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


app.use(express.static('static'));

//配置模版引擎
app.set('view engine', 'html');
app.set('views', '.');
app.engine('.html', require('ejs').renderFile);  

//连接并创建数据库，建集合，储存数据
var url = "mongodb://localhost:27017/shop";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    let dbase = db.db("shop");
    let items = [{
      id:1,url:"/item/1",name:"猫猫1",src:"/img/1.jpg"
    },{
      id:2,url:"/item/2",name:"猫猫1",src:"/img/2.jpg"
    },{
      id:3,url:"/item/3",name:"猫猫1",src:"/img/3.jpg"
    },{
      id:4,url:"/item/4",name:"猫猫1",src:"/img/4.jpg"
    },{
      id:5,url:"/item/5",name:"猫猫1",src:"/img/5.jpg"
    },{
      id:6,url:"/item/6",name:"猫猫1",src:"/img/6.jpg"
    },{
      id:7,url:"/item/7",name:"猫猫1",src:"/img/7.jpg"
    },{
      id:8,url:"/item/8",name:"猫猫1",src:"/img/8.jpg"
    }];
    dbase.createCollection('items', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        dbase.collection('items').deleteMany({}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " 条文档被删除");
            dbase.collection('items').insertMany(items, function(err, res) {
                if (err) throw err;
                console.log("插入的文档数量为: " + res.insertedCount);
                db.close();
            });
        })
    })


});

//主页路由&主页数据
app.get('/index', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
      let dbase = db.db("shop");
      dbase.collection("items"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        db.close();
        res.render("index",{data:result});
      });
  });
   
});
 
//单品页路由&单品数据查找
app.get('/item/:key', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("shop");
    dbase.collection("items"). find({id:Number(req.params.key)}).toArray(function(err, result) { 
    // 返回集合中符合条件的数据
        if (err) throw err;
        db.close();
        res.render("item",{data:result});
    });
  });
   
});

//服务监听 
var server = app.listen(3000, function () {
 
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://localhost", port)
 
})
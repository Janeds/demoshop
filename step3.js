const express = require('express');
const app = express();


//静态资源管理
app.use(express.static('static'));
//引入模板引擎
app.set('view engine', 'html');
app.set('views', '.');
app.engine('.html', require('ejs').renderFile);  

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
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    
    let dbase = db.db("shop");
    dbase.createCollection('items', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        dbase.collection('items').insertMany(items, function(err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    })
});

app.get('/index', function (req, res) {
    res.render("index",{data:items});
});
 

app.get('/item/:key', function (req, res) {
    res.render("item",{data:items[Number(req.params.key)-1]});
});

 
var server = app.listen(3000, function () {
 
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://localhost", port)
 
});
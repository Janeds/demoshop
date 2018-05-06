var express = require('express');
var app = express();

//app.use(express.static('static'));

app.get('/index', function (req, res) {
    res.send("index");
});
 

app.get('/item/:key', function (req, res) {
    res.send("item:"+req.params.key);
});

 
var server = app.listen(3000, function () {
 
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://localhost", port)
 
});
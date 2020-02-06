var express = require('express');
var api = require('./api');
var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
})

app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())
// =========================静态资源=====================
app.use('/static', express.static('static'));
// ====================================================

// =====================存储图片==========================
app.post("/api/upload/:picfile", function (req, res, next) {
  api.uploadFile(req,res)
})
// =====================删除图片==========================
app.get("/api/deletepic", function (req, res, next) {
  api.deletePic(req,res)
})
// =====================添加分类==========================
app.get("/api/addcate", function (req, res, next) {
  api.addCate(req.query,res)
})

// =======================获取分类========================
app.get("/api/getcates",function(req,res,next){
  api.getCates(res)
})

// =======================删除分类========================
app.get("/api/delcate",function(req,res,next){
  api.delCate(req.query.id,res)
})






app.listen(8888, function () { 
  console.log('http://localhost:8888')
})
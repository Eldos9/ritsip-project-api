var express = require('express');
var app = express();
// 公共模块
var uploadpic = require('./api/public/uploadpic');
var deletepic = require('./api/public/deletepic');
var cateidname = require('./api/public/cateidname');
// 分类api
var addcate = require('./api/api/category/addcate');
var getcates = require('./api/api/category/getcates');
var delcatebyid = require('./api/api/category/delcatebyid');
var getonecate = require('./api/api/category/getonecate');
var updatecate = require('./api/api/category/updatecate');
// 文章api
var addarticle = require('./api/api/article/addarticle');
var getarticles = require('./api/api/article/getarticles');
var delrecarticle = require('./api/api/article/delrecarticle');
var getoneart = require('./api/api/article/getoneart');
var updateart = require('./api/api/article/updateart');
var getsoldart = require('./api/api/article/getsoldart');


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
  uploadpic(req,res)
})
// =====================删除图片==========================
app.get("/api/deletepic", function (req, res, next) {
  deletepic(req,res)
})
// =============================获取分类id和名称===========================

app.get("/api/cateidname", function (req, res, next) {
  cateidname(res)
})
// public^
// ---------------------------------------------------------
// =============================获取付费文章===========================

app.get("/api/getsoldart/:sort", function (req, res, next) {
  getsoldart(req.params,res)
})

// =============================添加文章===========================

app.post("/api/addarticle", function (req, res, next) {
  addarticle(req.body,res)
})

// =============================根据id获取文章的详细===========================

app.get("/api/getoneart", function (req, res, next) {
  getoneart(req.query,res)
})
// =============================根据分类和排序获取文章===========================

app.get("/api/getarticles", function (req, res, next) {
  getarticles(req.query,res)
})

// =============================删除或者更新推荐文章===========================

app.get("/api/delrecarticle", function (req, res, next) {
  delrecarticle(req.query,res)
})
// ============================更新文章======================================
app.post("/api/updateart/:id", function (req, res, next) {
  updateart(req,res)
})

// =====================添加分类==========================
app.get("/api/addcate", function (req, res, next) {
  addcate(req.query,res)
})

// =======================获取分类========================
app.get("/api/getcates",function(req,res,next){
  getcates(res)
})

// =======================删除分类========================
app.get("/api/delcate",function(req,res,next){
  delcatebyid(req.query.id,res)
})


// =======================通过id获取一个分类的数据========================
app.get("/api/getonecate",function(req,res,next){
  getonecate(req.query.id,res)
})

// =============================通过id更新分类===========================

app.get("/api/updatecate/:id", function (req, res, next) {
  updatecate(req,res)
})






app.listen(8888, function () { 
  console.log('http://localhost:8888')
  console.log('服务器已启动...')  
})
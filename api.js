var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var formidable = require('formidable');
var sd = require('silly-datetime');

var MYIP = 'http://localhost:8888/'
var conUrl = "mongodb://127.0.0.1:27017"
var DBNAME = "miniprogram"

module.exports = {
  // ====================上传图片==========================
  uploadFile: function(req,res){

    let IMAGE_UPLOAD_FOLDER = 'static/'+req.params.picfile;
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编码格式
    form.encoding = 'utf-8';
     //设置上传目录
    form.uploadDir = IMAGE_UPLOAD_FOLDER;
      //保留后缀
    form.keepExtensions = true;
     //文件大小
    form.maxFieldsSize = 2 * 1024 * 1024;
    // -------------------------
    form.parse(req,function(err,fields,files){
      let filesFile = files.file
      if (err) {
        return res.json({
          status: 500,
          msg: "内部服务器错误",
          result:''
        })
      }
      // 限制文件大小 单位默认字节 这里限制大小为2m
      // if (filesFile.size > form.maxFieldsSize) {
      //   fs.unlink(filesFile.path)
      //   return res.json({
      //     status: '1',
      //     msg: "图片大小不能超过2M",
      //     result:''
      //   })
      // }
       
  
      //后缀名
      var extName = '';
      switch (filesFile.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
      }
      if (extName.length == 0) {
        return res.json({
          status: '1',
          msg: "只支持png和jpg格式图片",
          result:''
        })
      }
      //使用第三方模块silly-datetime
      var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
      //生成随机数
      var ran = parseInt(Math.random() * 8999 + 10000);
      // 生成新图片名称
      var avatarName = t + '_' + ran + '.' + extName;
      // 新图片路径
      var newPath = form.uploadDir + '/' + avatarName;
      // 更改名字和路径
      fs.rename(filesFile.path, newPath, function (err) {
        if (err) {
          return res.json({
            "code": 401,
            "message": "图片上传失败"
          })
        } else{
          return res.json({
            status: "200",
            msg: "图片上传成功",
            data: MYIP + IMAGE_UPLOAD_FOLDER + '/' + avatarName,
            ifdelete: IMAGE_UPLOAD_FOLDER + '/' + avatarName
         })
        }
      })
    })
    // ------------------------
  },
    // =======================删除图片=========================
  deletePic:function(req,res){
      // console.log(req.query)
      // return res.json(req.query.picurl)
      //9. fs.unlink删除文件  
      fs.unlink(req.query.picurl,function(err){
        if(err){
            return res.json({
              msg:"删除失败",
              error:err
            });
        }
        return res.json("删除文件成功")
      })
    } ,
  // =======================添加分类=========================
  addCate:function(info,res){

      MongoClient.connect(conUrl, function (err, client) {
        if (err) return console.log(err)
        //1. 获取数据库db对象
        var db = client.db(DBNAME);
        //2. 获取集合对象
        var category = db.collection("category");

        category.insertOne(info, function (err, dbResult) {
          if (dbResult.result.ok == 1) {
              client.close();
              res.json({
                status:"200",
                msg:"分类添加成功!"
              })
          }else{
            client.close();
            res.json({
              status:"0",
              msg:"分类添加失败!",
              error:err
            })
          }
        })

    })
  },
  // =========================获取所有分类======================
  getCates(res){
    MongoClient.connect(conUrl, function (err, client) {
      //1. 获取数据库db对象
      var db = client.db(DBNAME);
      //2. 获取集合对象
      var category = db.collection("category");

      //3. 获取所有的新闻数据
      category.find().toArray(function (err, arr) {
        if(err){
          res.json({
            err:err
          })
          client.close();
          return
        }
          res.json({
            status:'200',
            msg:"获取所有分类成功",
            data:arr
          })
      })

      //4. 关闭数据库连接
      client.close();
    })
  },

  // ============================删除分类=============================
  delCate(id,res){
    
  }

} 
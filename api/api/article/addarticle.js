// 添加文章模块
var articleModel = require('../../model/article')
var categoryModel = require('../../model/category')

module.exports = function(info,res){
  if(info.ispay){
    info.arthot=Math.floor(Math.random() * (200 - 100)) + 100;
  }else{
    info.arthot=Math.floor(Math.random() * (190 - 90)) + 90;
  }
  
  info.arttime=Date.parse(new Date());
  // info.arttime=new Date();  


var article = new articleModel(info)

article.save(function(err){


  if(err){
    res.json({
      err:err
    })
    return
  }

  articleModel.countDocuments({'artcateid':info.artcateid},function(err,count){

    categoryModel.updateOne(
      {"_id":info.artcateid},   
      {"sum":count},
      function(err){
          if(err){
                  return console.log(err);
              }
              
              res.json({
                status:"200",
                msg:"添加文章成功!"
              })
              
            })
  })


})

    




  }
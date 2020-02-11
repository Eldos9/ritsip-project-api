// 添加分类模块
var categoryModel = require('../../model/category')

async function ishasHealth(info,res){
  var count = await categoryModel.countDocuments({'catename':info.catename})
  if(count==1){
    res.json({
      status:"0",
      msg:"分类添加失败!该分类已存在！"
    })
    return
  }

  var cate = new categoryModel(info)

  cate.save(function(err){
    if(err){
      res.json({
        msg:err
      })
      return
    }

    res.json({
      status:"200",
      msg:"分类添加成功!"
    })
  })
}


module.exports = function(info,res){

ishasHealth(info,res)

}
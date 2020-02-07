// 添加分类模块
var categoryModel = require('../../model/category')


module.exports = function(info,res){
var cate = new categoryModel(info)

cate.save(function(err){
  if(err){
    res.json({
      err:err
    })
    return
  }

  res.json({
    status:"200",
    msg:"分类添加成功!"
  })
})

}
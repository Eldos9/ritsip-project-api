// 删除分类模块

var categoryModel = require('../../model/category')

module.exports = function(id,res){

  categoryModel.deleteOne({'_id':id},function(err){
    if(err){
      res.json({
        status:"0",
        err:err,
        msg:"删除分类失败！"
      })
      return
    }

    res.json({
      status:"200",
      err:err,
      msg:"删除分类成功！"
    })
  })

}
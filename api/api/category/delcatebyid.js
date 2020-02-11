// 删除分类模块

var categoryModel = require('../../model/category')
var articleModel = require('../../model/article')


async function main(id,res){
    var health = await categoryModel.find({'catename':'ساغلاملىق'})
    var result = await articleModel.updateMany({'artcateid':id},{'artcateid':health[0]._id})
    var count = await articleModel.countDocuments({'artcateid':health[0]._id})
    var okres = await  categoryModel.updateOne({"_id":health[0]._id},{"sum":count})
    
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

module.exports = function(id,res){
 

  main(id,res)

 
}
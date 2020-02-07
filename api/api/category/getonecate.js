// 根据id获取一个分类的数据
var categoryModel = require('../../model/category')

module.exports = function(id,res){

  categoryModel.find({"_id":id},'_id catename cateurl cateindex',function(err,arr){

    if(err){
      console.log("获取分类数据失败",err)
      return
    }


    res.json({
      status:'200',
      data:arr
    })


  })


  }
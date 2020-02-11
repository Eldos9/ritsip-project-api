// 获取所有分类id和名称模块
var categoryModel = require('../model/category')

module.exports = function(res){

  categoryModel.find({},'_id catename').sort({'cateindex':1}).exec(function(err,arr){

    res.json({
      status:'200',
      data:arr
    })


  })


  }
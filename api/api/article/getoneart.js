var articleModel = require('../../model/article')

module.exports = async function(info,res){
  var arr = await articleModel.findOne({'_id':info.id},{'arttime':0,'artsold':0,'artkeep':0,'arthot':0})
  if(arr){
    res.json({
      status:200,
      data:arr
    })
  }else{
    res.json({
      status:'0',
      data:'获取文章信息失败！请检查该文章是否有错误'
    })
  }
}
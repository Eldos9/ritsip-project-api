var articleModel = require('../../model/article')
var categoryModel = require('../../model/category')
var count = 0
module.exports = async function(info,res){
  var msg = ""
  if(info.how == 'rec'){
    var flag = await articleModel.find({'_id':info.id},{"isrec":1})
    var result = await articleModel.updateOne({'_id':info.id},{'isrec':!flag[0].isrec}) 
    count = await articleModel.countDocuments({'isrec':true})    
    msg = "更新数据成功！"
  }

  if(info.how == 'del'){
    var result = await articleModel.deleteOne({'_id':info.id})
    count = await articleModel.countDocuments({'artcateid':info.cateid})
    await categoryModel.updateOne({"_id":info.cateid},{"sum":count})
    msg = "删除文章成功！"
  }
if(result.ok==1){
  res.json({
    status:'200',
    count:count,
    msg : msg
  })
}else{
  res.json({
    status:'0',
    msg : "操作数据失败,请重试"
  })
}

}
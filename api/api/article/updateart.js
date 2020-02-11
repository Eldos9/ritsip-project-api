var articleModel = require('../../model/article')
var categoryModel = require('../../model/category')

module.exports = async function(req,res){
  var id = req.params.id;
  req.body.arttime=Date.parse(new Date());
  console.log(req.body)
  var obj = await articleModel.findOne({'_id':id})
  var result = await articleModel.updateOne({"_id":id},req.body);
  var oldcount = await articleModel.countDocuments({'artcateid':obj.artcateid})  
  var newcount = await articleModel.countDocuments({'artcateid':req.body.artcateid})
  await categoryModel.updateOne({"_id":obj.artcateid},{"sum":oldcount})  
  await categoryModel.updateOne({"_id":req.body.artcateid},{"sum":newcount})
  if(result.ok == 1){
    res.json({
      status:200,
      msg:'更新文章成功！'
    })
  }else{
    res.json({
      status:0,
      msg:'更新文章失败！请重试...'
    })
  }

}
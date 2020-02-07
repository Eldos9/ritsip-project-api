// 删除图片模块
var fs = require('fs');

module.exports = function(req,res){

  fs.unlink(req.query.picurl,function(err){
    if(err){
        return res.json({
          msg:"删除失败",
          error:err
        });
    }
    return res.json("删除文件成功")
  })
} 
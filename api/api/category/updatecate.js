// 通过id更新分类数据

var categoryModel = require('../../model/category')

module.exports = function(req,res){
  var id = req.params.id;

  categoryModel.updateOne(
    {"_id":id},   
    req.query,
    function(err,doc){
        if(err){
                return console.log(err);
            }

        res.json({
          status:'200',
          msg:"更改数据成功！"
        })

    })


  }
var articleModel = require('../../model/article')

// 获取付费文章模块

module.exports = async function(params,res){
  var sort = {'arttime': -1}
  if(params.sort == 'hot'){
    sort = {'arthot': -1}
  }

  if(params.sort == 'sold'){
    sort = {'artsold':-1}
  }
  var count = await articleModel.countDocuments({'ispay':true})
  var arr = await articleModel.find({'ispay':true},{'arturl':0,'arttext':0})
  .populate('artcateid',{catename: 1,_id: 0}).sort(sort)

  res.json({
    data:arr,
    count:count
  })

}
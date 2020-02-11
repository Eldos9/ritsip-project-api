var articleModel = require('../../model/article')


module.exports = async function(info,res) {
  var sort = {'arthot': -1}
  var cateid = info.cateid == 'all' ? {} : {'artcateid':info.cateid}
  if(info.sort == 'time'){
    sort = {'arttime': -1}
  }
  if(info.sort == 'hot'){
    sort = {'arthot': -1}
  }
  if(info.sort == 'keep'){
    sort = {'artkeep': -1}
  }

  if(info.sort == 'rec'){
    cateid = {'isrec':true}
  }

  if(info.sort == 'key'){
    sort = {'arttime': -1}
    cateid = {'artname':{$regex:info.search}}
  }
  var curcount = await articleModel.countDocuments(cateid)   
  var allcount = await articleModel.countDocuments({})  
  var result = await articleModel.find(cateid,{'arturl':0,'artsold':0,'artprice':0,'arttext':0})
  .sort(sort)

  res.json({
    data:result,
    allcount:allcount,
    curcount:curcount
  })
  



}
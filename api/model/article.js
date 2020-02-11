var mongoose=require('./db.js');
var categoryModel = require('./category')
var Schema=mongoose.Schema;

var articleSchema=mongoose.Schema({

    artname:{ type: String, index: true },
    arturl:String,
    arthot:Number,
    arttime:Number,
    artkeep:{type:Number,default:0},
    artcateid:{type:Schema.Types.ObjectId,ref:categoryModel},
    isrec:{type:Boolean,default:false},
    ispay:{type:Boolean,default:false},
    artprice:Number,
    artsold:{type:Number,default:0},
    arttext:String,
    
})


module.exports=mongoose.model('Article',articleSchema,'article');

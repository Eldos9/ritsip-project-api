var mongoose=require('./db.js');


var articleSchema=mongoose.Schema({

    artname:{ type: String, index: true },
    arturl:String,
    arthot:Number,
    arttime:Date,
    artcateid:{type:Schema.Types.ObjectId},
    isrect:{type:Boolean,default:false},
    ispay:{type:boolean,default:false},
    price:Number,
    arttext:String,
    
})


module.exports=mongoose.model('Article',articleSchema,'article');

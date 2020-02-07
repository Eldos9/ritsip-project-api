var mongoose=require('./db.js');


var categorySchema=mongoose.Schema({

    catename:String,
    cateurl:String,
    cateindex:Number,
    sum:{
        type:Number,
        default:0
    }
})


module.exports=mongoose.model('Category',categorySchema,'category');

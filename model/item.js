const mongoose=require('mongoose');
const {Schema,model}= mongoose;

const itemSchema= new Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        auto: true,
      },

    image:{
       type:String ,    
       required:true,   
    },
    item:{
        type:String ,    
        required:true,   
     },
    
    owner:{
       type:String ,    
       required:true,   
    },
    email:{
        type:String,
        required:true,  
        unique:true, 

    },
    phone:{
        type:Number,
        required:true,  
        unique:true, 

    },
    description:{
        type:String,  
        required:true,         
    },

    price:{
        type:Number,
    },

    date:{
        type:Date,
        default:Date.now,
    },
})
const items=mongoose.model('item', itemSchema)
module.exports=items
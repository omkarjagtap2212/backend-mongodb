const mongoose =require("mongoose")


const userScheme=new mongoose.Schema({

    fname:{
        type:String,
    
    },
    lname:{
        type:String,
        unquie:true,
      

    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },

},{
    collection:"UserInfo"
})



const User=mongoose.model("User",userScheme)

module.exports=User
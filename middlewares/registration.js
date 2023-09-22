const validator = require("email-validator")

exports.registeration=(req,res,next)=>{
    const {name,email,password}= req.body
    if(!name || !email || !password){
      return(res.status(402).json({msg:"complete all fields"}))  
    }
    if(!validator.validate(email)){
        return(res.status(401).json({msg:"email is not valid"}))
    }

    if((password.length) < 5){
       return (res.status(403).json({msg:"password length must be > 5"}))
    }

    else {
      next()
    }
}

exports.login=(req,res,next)=>{
  const {email,password}= req.body
  if( !email || !password){
    return(res.status(402).json({msg:"complete all fields"}))  
  }
  if(!validator.validate(email)){
      return(res.status(401).json({msg:"email is not valid"}))
  }
  else {
    next()
  }
}
const jwt =require("jsonwebtoken")
const users = require("../model/usermodel")
// import model
// secret or key
require("dotenv").config({path:'./config/.env'})

const verifyToken = (req, res, next) => {
    let token=req.headers['authorization'];
    if(token){
      token=token.split('')[1]
      jwt.verify(token,process.env.tokenKey,(err,valid)=>{
        if(err){
          (res.send({msg:'is not authorized'}))
        }
        else{
          (res.send({msg:'is authorized'}))
          next()
        }
      })
    }else{
      (res.send({msg:'Please provide a token'}))
    }
  };
  module.exports = verifyToken;
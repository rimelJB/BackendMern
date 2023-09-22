const mongoose=require('mongoose')
require('dotenv').config({path:'./config/.env'})

// const connectDB=() => {
//     mongoose.connect(process.env.mongoURL,{useNewUrlParser: true,useUnifiedTopology:true})
//     .then(()=>{console.log('Database is connected successfully')})
//     .catch((error)=>{ console.log('Database is not connected',error)})
// }
//   module.exports = connectDB
const connectDB = async ()=>{
  try {
      await mongoose.connect(process.env.mongoURL,{useNewUrlParser: true,useUnifiedTopology:true})
      console.log("monogo DB connected")
  } catch (error){
      console.log(`database failed to connected ${error}`)
  }
}
module.exports = connectDB ;
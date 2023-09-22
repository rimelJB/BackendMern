const express = require("express");
const connectDB = require("./config/connectDB");
const items= require("./model/item");
const users= require("./model/usermodel");
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express();
app.use(cors({origin:'*'})); 
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api',require("./routes/item"));
app.use('/api',require("./routes/useroute"));
app.use((req,res)=>{res.send("API is Running...")})

const port = process.env.Port || 5000;
app.listen(port, (err) =>{
  err ? console.log(err) : console.log(`the server is running on ${port}`)
});


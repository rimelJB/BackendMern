const express=require('express')
const router=express.Router()
const items =require('../model/item')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


//GET :  RETURN ALL ITEMS
router.get("/items", async (req, res) => {
    try {
      const data = await items.find({}).exec();
      res.json({ item: data });
    } catch (error) {
      res.status(501).send("get item failed");
    }
  });

   //POST :  ADD A NEW ITEM TO THE DATABASE
   router.post("/items",(req,res)=>{
    const {image,item,owner,email,phone,description,price,date}= req.body
    items.create({image,item,owner,email,phone,description,price,date},(err)=>{
  
        err ? res.status(500).send({msg:"add item failed server",error:err}): res.status(201).send("add item succed server")
    }) 
  })
  
  //PUT : EDIT A ITEM BY ID
  router.put("/items/:id", (req, res) => {
    items.findByIdAndUpdate(req.params.id,req.body, (err) => {
      err? res.status(502).send("update failed") : res.status(202).send("update complete");
    });
  });
  
  //  DELETE : REMOVE A ITEM BY ID
  router.delete("/items/:id", (req, res) => {
    items.findByIdAndRemove(req.params.id, (err) => {
      err ? res.status(502).send("delete failed") : res.status(203).send("delete complete")
    })
  })
  
  module.exports=router
const express=require("express");
const User=require("../Modals/User.modal")
const route=express.Router();
route.post("/",async(req,res)=>{
    const user=await User.create(req.body);
    return res.status(200).send({user})
})
route.get("/",async(req,res)=>{
    const user=await User.find().lean().exec();
    return res.status(200).send({user});
})
route.get("/:id",async(req,res)=>{
    const user=await User.findById(req.params.id).lean().exec();
    return res.status(200).send({user})
})
route.put("/:id",async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({user});
})
route.delete("/:id",async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({user})
})
module.exports=route
const express=require("express");
const loginRoute=express.Router();
const registration=require("../Modals/Signup.modal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
loginRoute.post("/",async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.status(501).json({error:"You cant empty the faild"})
    }
    const userLog=await registration.findOne({email:email})
    if(userLog){
        
        const passwordMatch=await bcrypt.compare(password,userLog.password);
        let token=await userLog.generateAuthToken();
        console.log(token)
       if(!passwordMatch){
           return res.status(501).json({error:"Invalid Credential"})
       }
       else{
           return res.status(201).json({message:"login successful"})
       }
    }
    return res.status(501).json({message:"invalid crediantial"})
})
module.exports=loginRoute
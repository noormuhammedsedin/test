const express=require("express");
const registrationRoute=express.Router();
const registration=require("../Modals/Signup.modal");
registrationRoute.post("/",async(req,res)=>{
const {firstName,lastName,email,password,cpassword}=req.body;
if(!firstName||!lastName||!email||!password||!cpassword){
    return res.status(501).json({error:"You cant empty the faild"})
}
const userEmail=await registration.findOne({email:email});
if(userEmail){
    return res.status(501).json({error:"Email is allrady exist"})
}
const userData=new registration({firstName,lastName,email,password,cpassword});
await userData.save();
return res.status(201).json({userData})
})

module.exports=registrationRoute;
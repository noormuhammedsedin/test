const express=require("express");
const Connect=require("./Config/db.js")
const route=require("./Controllers/User.controller")
const registrationRoute=require("./Controllers/Signup.controller")
const loginRoute=require("./Controllers/Login.controller")
const dotenv=require("dotenv")
const app=express();
app.use(express.json());
app.use("/user",route)
app.use("/signup",registrationRoute)
app.use("/login",loginRoute)
app.listen((8000),async()=>{
   await Connect();
   console.log("Listening on port 8000")
})
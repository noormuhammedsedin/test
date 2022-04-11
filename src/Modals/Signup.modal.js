const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
const SignupSchema=new mongoose.Schema({
 firstName:{type:String,required:true},
 lastName:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
 cpassword:{type:String,required:true},
 tokens:[{token:{type:String,required:true}}]
},
{
versionKey:false,
timestamps:true
})


SignupSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next()
})

SignupSchema.methods.generateAuthToken=async function(){
    let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
}

const registration=mongoose.model("registration",SignupSchema);
module.exports=registration;
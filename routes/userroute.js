const express=require("express");

const {Usermodel}=require("../model/usermodel")

const userrouter=express.Router();

const bcrypt=require("bcrypt")

const jwt = require("jsonwebtoken")

// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token


userrouter.post("/register",async(req,res)=>{
    const{name,email,gender,password}=req.body
    try {
        bcrypt.hash(password, 5, async(err, secure)=> {
       if(err){
        console.log(err);
       }else{
        const user=new Usermodel({name,email,gender,password:secure})
        await user.save()
        res.json("registered")
       }
        });
    } catch (error) {
        res.send("Error in registering the user")
        console.log(error)
    }
})

  userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await Usermodel.find({email:email})
        console.log(user)
        const hashed_pass=user[0].password
        console.log(hashed_pass)

        if(user.length>0){
            bcrypt.compare(password, hashed_pass,(err, result)=> {
                if(result){
                    const token=jwt.sign({ course:'backend',"userID":user[0]._id}, 'masai');
                    res.send({"msg":"Login succesfull","token":token})
                }else{
                    res.send("wrong credentials")
                }
            });
        }else{
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send("Error in logging the user")
        console.log(error)
    }
  })

module.exports={
    userrouter
}



// {
//     "name":"nikhil Kumar",
//     "email":"nikhil@gmail.com",
//     "gender":"male",
//     "password":"nikhil"
//   }


// "email":"nikhil@gmail.com",
// "password":"nikhil"
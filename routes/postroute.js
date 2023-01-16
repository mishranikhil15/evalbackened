const express=require("express")


const{Postmodel}=require("../model/postmodel")

const jwt = require("jsonwebtoken")

const postrouter=express.Router();

// const bcrypt=require("bcrypt")

postrouter.get("/",async(req,res)=>{
    let query=req.query
    // const device=req.query.device;
    const data= await Postmodel.find(query)
    res.send(data);

})

postrouter.get("/device",async(req,res)=>{
    let query=req.query
    const device=req.query.device;
    const data= await Postmodel.find({device:device})
    res.send(data);

})


postrouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const new_post=new Postmodel(payload)
        await new_post.save()
        res.send("created the post")
    } catch (error) {
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})


postrouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id
    const post= await Postmodel.findOne({_id:id})
    const user_post=post.userID
    const user_request=req.body.userID
    try {
        if(user_post==user_request){
            await Postmodel.findByIdAndUpdate({"_id":id},payload)
            res.send("updated the post")
        }else{
            res.json({"msg":"you are not authorized"})
        }
    } catch (error) {
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})


postrouter.delete("/delete/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id
    const post= await Postmodel.findOne({_id:id})
    const user_post=post.userID
    const user_request=req.body.userID
    try {
        if(user_post==user_request){
            await Postmodel.findByIdAndDelete({"_id":id})
            res.send("Deleted the post")
        }else{
            res.json({"msg":"you are not authorized"})
        }
    } catch (error) {
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})

module.exports={
    postrouter
}


// {
  
//     "title":"A day in my life",
//     "body":"what i do for living",
//     "device":"tablet"
//   }
const mongoose=require("mongoose")


// name ==> String
// email ==> String
// gender ==> String
// password ==> String

const UserSchema=mongoose.Schema({
  name:String,
  email:String,
  gender:String,
  password:String
})

  const Usermodel=mongoose.model("user",UserSchema)

  module.exports={
    Usermodel
  }
const express=require("express")


const {connection}=require("./config/db")
const cors=require("cors")
const{userrouter}=require("./routes/userroute")

const{postrouter}=require("./routes/postroute")

const{authenticate}=require("./middlewares/authentication")

require("dotenv").config()

const app=express();

app.use(cors({
    origin:"*"
}))

app.use(express.json())




app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userrouter)
app.use(authenticate)
app.use("/posts",postrouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        console.log("Trouble while connecting to db")
    }
    console.log(`running at ${process.env.port}`)
})
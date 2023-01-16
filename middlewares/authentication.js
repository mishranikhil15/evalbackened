const jwt= require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization

    try {
        if(token){
            const decoded = jwt.verify(token, 'masai');
            console.log(decoded);
            const userID=decoded.userID
            if(decoded){
                req.body.userID=userID
                next();
            }else{
                res.send("login required")
            }
        }else{
            res.send("Please login first")
        }
    } catch (error) {
        console.log(error);
        res.send("error")
    }
}

module.exports={
    authenticate
}
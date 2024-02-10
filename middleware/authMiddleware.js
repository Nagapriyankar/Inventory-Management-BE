//async fucntion includes try catch, inorder to avoid try catch,use asyncHandler package
const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")   //to connect user collection in database
const jwt = require("jsonwebtoken")

//before excuting the route function, the flow comes here to verify the cookie token

const protect = asyncHandler(async (req, res, next) => { 
    try {
        
        //check if req comes with cookie
        const token = req.cookies.token
        
        //if no token in the req
        if (!token) { 
            res.status(401)
            throw new Error("Not authorized, Please login")
        }

        //verify token -- if token and secret key is provided, it will return all the parameters passed while generating token
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        
        //get user details by id -  verified contains id
        const user = await User.findById(verified.id).select("-password")   //except password , retrieve rest of the details from db
        
        //if user not found, return error
        if (!user) { 
            res.status(401)
            throw new Error("User Not found")
        }

        //req is updated with user details retrieved from db
        req.user = user
        next()    //user controller- get user

    }
    catch {
        res.status(401)
        throw new Error("Not authorized, Please login")
    }

})

module.exports = protect
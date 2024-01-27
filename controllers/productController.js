//async fucntion includes try catch, inorder to avoid try catch,use asyncHandler package
const asyncHandler = require("express-async-handler")

const createProduct = asyncHandler(async (req, res) => { 
    res.send("prodcut route")
})

module.exports = {
    createProduct, 
}

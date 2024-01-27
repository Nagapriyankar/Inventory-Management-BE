//async fucntion includes try catch, inorder to avoid try catch,use asyncHandler package
const asyncHandler = require("express-async-handler")
const Product = require("../models/productModels")
const { fileSizeFormatter } = require("../utils/fileUpload")

const createProduct = asyncHandler(async (req, res) => { 
    //retrieve values from body
    const { name, sku, catagory, quantity, price, description } = req.body
    
    //validation
    if (!name || !catagory || !quantity || !price || !description || !sku) {
        res.status(400)
        throw new Error("Please fill in all the fields")
    }

    //Handle image upload 
    let fileData = {}
    if (req.file) {
        fileData = {
            fileName : req.file.originalname,
            filePath : req.file.path,
            fileType : req.file.mimetype,
            fileSize : fileSizeFormatter(req.file.size, 2)   //give size in bytes to kb
        }
    }

    //create product and add this to Product collection
    const product = await Product.create({
        user: req.user._id,
        name,
        sku,
        catagory,
        quantity,
        price,
        description,
        image: fileData
    })

    if (product) {
        console.log("Product created successful")
        res.status(201).json(product)
    }
    else {
        console.log("Error creating Product")
        res.status(400)
        throw new Error("Product not added, Try again!")
    }

})

module.exports = {
    createProduct, 
}

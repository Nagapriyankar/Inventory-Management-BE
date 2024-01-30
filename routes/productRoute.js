const express = require("express")
const  router = express.Router()
const protect = require("../middleware/authMiddleware")
const { createProduct, getAllProduct, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/productController")
const { upload } = require("../utils/fileUpload")



router.post("/addproduct", protect, upload.single("image"), createProduct)
router.get("/getallproduct", protect,  getAllProduct)
router.get("/getproduct/:id", protect, getSingleProduct)
router.delete("/delete/:id", protect, deleteProduct)
router.patch("/update/:id", protect, upload.single("image"), updateProduct)

module.exports = router;
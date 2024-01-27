const detenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path")

//initialize app 
const app = express()

//middleware

app.use(express.json()) //helps to handle json data in application 
app.use(cookieParser())  //to create http only cookie as response to front end
app.use(express.urlencoded({ extended: false })) //help to handle data that comes via url
app.use(bodyParser.json()) //helps to parse the data passing from FE to BE, convert to object for easy access
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
})) //helps to resolve conflicts while makn requst from BE TO FE

app.use("/uploads", express.static(path.join(__dirname, "uploads")))  // linked upload functionality - it is goig to point upload folder

//routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)

//test root route
app.get("/", (req, res) => {
    res.send('Backend Application - Inventory Management Application')
})


//initialize port
const PORT = process.env.port || 5000

//calling error handling middleware
app.use(errorHandler)

//connect to db and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Error Message: ${error}`)
    })
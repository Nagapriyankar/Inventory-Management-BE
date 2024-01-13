const detenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")

//initialize app 
const app = express()

//middleware

app.use(express.json()) //helps to handle json data in application 
app.use(cookieParser())
app.use(express.urlencoded({ extended: false })) //help to handle data that comes via url
app.use(bodyParser.json()) //helps to parse the data passing from FE to BE, convert to object for easy access
app.use(cors())

//routes Middleware
app.use("/api/users",userRoute)

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
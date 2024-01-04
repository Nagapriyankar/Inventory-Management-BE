const detenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

//initialize app 
const app = express()

//middleware
//helps to handle json data in application 
app.use(express.json())

//help to handle data that comes via url
app.use(express.urlencoded({ extended: false }))

//helps to parse the data passing from FE to BE, convert to object for easy access
app.use(bodyParser.json())

//routes
app.get("/", (req, res) => { 
    res.send('Home Page')
})


//initialize port
const PORT = process.env.port || 5000

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
const detenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const contactRoute = require("./routes/contactRoute")
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

//helps to resolve conflicts while makn requst from BE TO FE
/* app.use(cors({
    origin: 'https://inventorymanagementtool.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
})) */

/* manual CORS configuration */
// Set middleware of CORS 
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://inventorymanagementtool.netlify.app"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
});
/* manual CORS configuration  */

app.use("/uploads", express.static(path.join(__dirname, "uploads")))  // linked file upload functionality - it is goig to point upload folder

//routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/contactus", contactRoute)

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
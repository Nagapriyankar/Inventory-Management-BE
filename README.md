# Inventory Management Tool - BACKEND

## Project Structure
Frontend        :	React css
Backend         :	NodeJS, express
state management:	Redux toolkit
image storage   :	cloudinary
Email           :	nodemailer
Frontend        :	netlify, vercel
backend         :	render


### product MVC
### create model
    1.create product schema 
    2.mongoose.model helps to communicate to mongodb
    3.export the model

### create product controller
    1.contains codelogic for routes
    2.user asyncHandler
    3.export every module

### create Product route
    1.iport autthMiddleware to check authentication
    2.import all controller schema
    3.render the schema
    4.export router

### server.js
    1. import router
    2. add route middleware with "path" 


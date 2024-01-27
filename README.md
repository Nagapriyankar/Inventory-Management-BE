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

## Product controller
    # createProduct

## multer file upload - setup
    1.install - npm i multer  , this is middleware to handle multipart/form data
    2.POSTMAN - BODY > Formdata > header > content-type : multipart/formdata
    3.create utility function 
        import multer
        define file storage with destination and file name
        specify file format that can be allowed
        define upload with storage and filter function
        export upload
    4.server.js - linked upload functionality,  it is goig to point upload folder
    5.product routes 
        import upload utility
        add upload middleware to createProduct route
    6. Handle image upload in controller
        create a filesizeformatter function to convert size from bytes to kbytes in utility
        create file data - file name, path, type, size
        add it to product create
    



    



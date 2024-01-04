//import mongoose
const mongoose = require("mongoose")

//create user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],    //validation
    },
    email: {
        type: String,
        required: [true, "Please add a Email"],  
        unique: true,
        trim: true,     //remove space
        match: [                                    //validate using regex
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"

        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],    //validation
        minLength: [6,"Password must contain atleast 6 characters"],
        maxLength: [23,"Password cannot be more than 23 characters"]
    },
    photo: {
        type: String,
        required: [true, "Please upload a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+91"
    },
    bio: {
        type: String,
        minLength: [6, "Bio must contain atleast 6 characters"],
        maxLength: [250, "Bio cannot be more than 250 characters"],
        default: "bio"
    }
}, {
    timestamps: true,    //add timestamp by default
})


const User = mongoose.model("User", userSchema)

module.exports = User 


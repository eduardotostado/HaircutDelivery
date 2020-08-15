const mongoose = require("mongoose"),
        validator = require("validator");

const User = mongoose.model("users", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 8){
                throw new Error("The password must have a minimum of 8 characters.")
            }
        }
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isStylist: {
        type: Boolean,
        default: false
    }
});

module.exports = User;
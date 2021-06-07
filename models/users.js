const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
      },    

    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password needs be 6 characters or longer."],
        //bcrypt: true
      },    
      
    tag: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Tag"
        }
    ]
});

const User = mongoose.model("User", userSchema);



module.exports = User;

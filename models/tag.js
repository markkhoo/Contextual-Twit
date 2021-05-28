const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: { type: String, required: true },
   
});

const Book = mongoose.model("Tag", tagSchema);

module.exports = Book;
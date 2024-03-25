const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel
let mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
})

const article = mongoose.model("db.articles", articleSchema);

module.exports = article;
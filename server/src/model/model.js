const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
    {
        heading:{
            type: String,
            required: true,
            unique: true
        },
        news:{
            type: String,
            required: true,
            maxLength: 2960
        },
        newsUrl:{
            type: String,
            required: true
        },
        newsDate:{
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
            // required: true
        },
        source:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        }
    }
)
const NewsModel = new mongoose.model("new", newsSchema)
module.exports = NewsModel
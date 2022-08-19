const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
    {
        heading:{
            type: String,
            required: true,
            unique: true
        },
        hheading:{
            type: String,
            required: true
        },
        simplify:{
            type: String,
            required: true
        },
        hnews:{
            type: String,
            required: true
        },
        hsource:{
            type: String,
            required: true
        },
        hsimplified:{
            type: String,
            required: true
        },
        hnewsDate:{
            type: String,
            required: true
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
            required: true
        },
        simplified:{
            type: Boolean,
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
const NewsModel = new mongoose.model("neww", newsSchema)
module.exports = NewsModel
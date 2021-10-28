const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : {
        type : String,
        trim : true
    },
    content : {
        type : String,
    },
    slug : {
        type : String,
    },
    status : {
        type : String
    },
    feature_image : {
        type: String
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    created_at : {
        type : Date,
        default : new Date()
    },
    updated_at : {
        type : Date
    },
    internal : {
        type : Boolean
    }
});

module.exports = mongoose.model('Post', postSchema);
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

postSchema.path('title').validate(async function(title) {
    const finded = await postModel.find({title : title});
    return (typeof finded !== 'undefined' && finded.length === 0);
}, 'Post is exist!');

postSchema.pre('save', function(next) {
    const post = this;
    // update timeat if it has modified
    post.updated_at = Date.now().toLocaleString();
    next();
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
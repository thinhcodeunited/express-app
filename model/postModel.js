const postSchema = require('../model/schema/post');

const postModel = {
    getOne : async (obj) => {
        try {
            return await postSchema.findOne(obj).populate('author').exec();
        } catch (e) {
            return e;
        }   
    },
    getAll : async () => {
        try {
            return await postSchema.find({}).sort({created_at : -1}).populate('author').exec();
        } catch (e) {
            return e;
        }
    },
    create : async (obj) => {
        try {
            return await postSchema.create(obj);
        } catch (e) {
            return e;
        }
    }
}

module.exports = postModel;
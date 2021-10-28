const postSchema = require('../model/schema/post');

const postModel = {
    get : () => {

    },
    create : async (obj) => {
        try {
            return await postSchema.create(obj);
        } catch (e) {
            console.log('Co loi roi kia!')
        }
    }
}

module.exports = postModel;
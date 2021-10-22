const userSchema = require('../model/schema/user');

const userModel = {
    get : async (obj) => {
        try {
            const list = await userSchema.find(obj).exec();
            return list;
        } catch (e) {
            throw e;
        }
    },
    save : async (obj) => {
        let user = new userSchema(obj);
        try {
            await user.save();
            return true;
        } catch (e) {
            return e;
        }
    },
    update : async (filter, update) => {
        try {
            await userSchema.updateOne(filter, update);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = userModel;
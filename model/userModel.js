const userSchema = require('../model/schema/user');
const roleSchema = require('../model/schema/role');

const userModel = {
    get : async (obj) => {
        try {
            return await userSchema.find(obj).populate('role_id').exec();
        } catch (e) {
            throw e;
        }
    },
    register : async (obj) => {
        const role = await roleSchema.find().exec();
        const user = new userSchema({...obj, role_id : role[1]._id});
        try {
            return await user.save();
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
    },

    compareHashpw : async (pass, hashed) => {
        try {
            return await userSchema.comparepw(pass, hashed);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = userModel;
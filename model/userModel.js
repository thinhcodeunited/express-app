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
    getOne : async (obj) => {
        try {
            return await userSchema.findOne(obj).populate('role_id').exec();
        } catch (e) {
            throw e;
        }
    },
    register : async (obj) => {
        const role = await roleSchema.find().exec();
     
        if (obj.length) {
            obj.map(element => {
                element.role_id = role[1]._id;
                return element;
            });
        } else {
            obj = {...obj, role_id : role[1]._id};
        }
      
        try {
            return await userSchema.create(obj);
        } catch (e) {
            return e;
        }
    },
    update : async (finder, update) => {
        try {
            const textpw = update.password;
            if (textpw) {
                const newpw = await userSchema.hashpw(textpw)
                update.password = newpw.newpw;
                update.salt = newpw.salt;
            }

            if (update.role_id) {
                const role = await roleSchema.findOne({role : update.role_id}).exec();
                update.role_id = role._id;
            }

            await userSchema.findOneAndUpdate(finder, update);
        } catch (e) {
            throw e;
        }
    },
    remove : async (finder) => {
        try {
            await userSchema.findOneAndDelete(finder);
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
const {mongoose} = require('../../utils/db');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    username : {
        type : String,
        trim: true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        validate : [isEmail, 'Invalid email']
    },
    role_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Role'
    },
    createAt : {
        type : Date,
        default : Date.now()
    },
    updateAt : {
        type : Date
    },
    salt: String,
});

UserSchema.index({updateAt: 1, username: 1})

UserSchema.path('username').validate(async function (username, cb) {
    const finded = await userModel.find({username : username}).exec();
    return (typeof finded !== 'undefined' && finded.length === 0);
}, 'User exists!');

UserSchema.pre('find', async function(next) {
    const user = this;
    user.updateAt = Date.now();
    next();
});

UserSchema.pre('save', async function(next) {
    const user = this;
    // update timeat if it has modified
    user.updateAt = Date.now();
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    try {
        const {salt, newpw} = await userModel.hashpw(this.password)
        user.password = newpw;
        user.salt = salt;
        next();
    } catch (e) {
        return next(e);
    }
});


UserSchema.statics.hashpw = async function(password) {
    try {
        const salt = await bcrypt.genSalt(6);
        const newpw = await bcrypt.hash(password, salt);
        return {salt : salt, newpw : newpw};
    } catch (e) {
        return e;
    }
};

UserSchema.statics.comparepw = async function(password, hashed) {
    return await bcrypt.compare(password, hashed);
}

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;
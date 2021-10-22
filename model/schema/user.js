const {mongoose} = require('../../utils/db');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    id : mongoose.Types.ObjectId,
    username : {
        type : String,
        trim: true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        validate : [isEmail, 'Invalid email']
    },
    role : Number,
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

UserSchema.pre('save', function(next) {
    const user = this;
    user.updateAt = Date.now();

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.createUser = function(username, password, email) {
    let salt = randomSalt();
    let hashPassword = hashPw(password, salt);
    let user = new this({
        salt: salt,
        password: hashPassword
    });
}

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
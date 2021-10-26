const {mongoose} = require('../../utils/db');

const roleSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    role : {
        type : String
    },
    name : {
        type : String,
        ref : 'User'
    }
});

module.exports = mongoose.model('Role', roleSchema);
const bcrypt = require('bcrypt');

module.exports = {
    execute : async (password) => {
        const salt = await bcrypt.genSalt(6);
        return await bcrypt.hash(password, salt);
    },
    compare : async (password, hashToCompare) => {
        return await bcrypt.compare(password, hashToCompare);
    }
}
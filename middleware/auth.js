const {body, validationResult} = require('express-validator');
const {connectDB} = require('../utils/db');
const hash = require('../bin/hash');

module.exports = {
    check : async (req, res, next) => {
        const query = {
            username : req.body.username.trim()
        }

        try {
            let dbo = await connectDB();
            const a = await dbo.collection('users').findOne(query);
            if (!a) {
                return res.redirect('/login');
            }
            if (hash.compare(req.body.password, a.password)) {
                next();
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    },
}

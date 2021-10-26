const userModel = require('../model/userModel');

const auth = async (req, res, next) => {
    const query = JSON.parse(JSON.stringify(req.body));
    const doc = await userModel.get({username : query.username});
    console.log(doc);
    const result = await userModel.compareHashpw(query.password, doc[0].password);
    if (!result) {
        return res.redirect('/login');
    }
    req.userinfo = doc;
    next();
}

module.exports = {auth};
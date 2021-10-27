const userModel = require('../model/userModel');

const authBeforeLogin = async (req, res, next) => {
    const query = JSON.parse(JSON.stringify(req.body));
    const doc = await userModel.get({username : query.username});
    if (doc.length === 0) {
        return res.redirect('/login');
    }

    const result = await userModel.compareHashpw(query.password, doc[0].password);
    if (!result) {
        return res.redirect('/login');
    }

    req.session.Userinfo = doc[0];
    next();
}

const isAuthenticated = (req, res, next) => {
    const userss = req.session.Userinfo;

    if (req.originalUrl === '/login') {
        if (userss) {
            return res.redirect('/userinfo')
        }
        next();
    }

    if (!userss) return res.redirect('/login');
    next();
}
module.exports = {authBeforeLogin, isAuthenticated};
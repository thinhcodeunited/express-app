const userModel = require('../model/userModel');

module.exports.register = async (req, res) => {
    const userinfo = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        role : 2
    };

    const addnew = await userModel.save(userinfo);
    if (typeof addnew == 'boolean') {
        return res.redirect('/login');
    }
    return res.redirect('/register');
}

module.exports.login = (req, res) => {
    res.render('users/userinfo', {title : 'User Info'})
}

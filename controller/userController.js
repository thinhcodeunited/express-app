const userModel = require('../model/userModel');

module.exports.register = async (req, res) => {
    const userinfo = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    };

    const reg = await userModel.register(userinfo);
    if (reg._message) {
        return res.redirect('/register');
    }
    console.log(reg);
    req.session.destroy((err) => {
        res.redirect('/login');
    })
}

module.exports.login = (req, res) => res.redirect('/userinfo');

module.exports.userinfo = (req, res) => {
    const obj = {
        title : 'User Info',
        username : req.session.Userinfo.username,
        email : req.session.Userinfo.email,
        role_name : req.session.Userinfo.role_id.name
    }
    res.render('user/userinfo', obj);
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
}
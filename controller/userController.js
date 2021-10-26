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
    res.redirect('/login')
}

module.exports.login = (req, res) => {
    const userinfo = req.userinfo;
    const obj = {
        title : 'User Info',
        username : userinfo[0].username,
        email : userinfo[0].email,
        role : userinfo[0].role_id.role,
        role_name : userinfo[0].role_id.name
    }
    res.render('user/userinfo', obj)
}

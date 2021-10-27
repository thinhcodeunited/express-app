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
        ...req.myapp_data,
        datenow : new Date()
    }
    res.render('user/userinfo', obj);
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
}

module.exports.listUsers = async (req, res) => {
    const users = await userModel.get({});
    const obj = {
        title : 'Manage Users',
        ...req.myapp_data,
        users : users
    }
    console.log(obj);
    res.render('user/listuser', obj);
}
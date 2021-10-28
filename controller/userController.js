const userModel = require('../model/userModel');
const {get_capability} = require('../utils/capability');
const {getsessiondata} = require('../utils/getsessiondata');

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

module.exports.login = async (req, res) => {
    const query = JSON.parse(JSON.stringify(req.body));
    const doc = await userModel.getOne({username : query.username});

    if (!doc) {
        return res.redirect('/login');
    }
    //
    const result = await userModel.compareHashpw(query.password, doc.password);
    if (!result) {
        return res.redirect('/login');
    }
    //STORE SESSION
    req.session.Userinfo = get_capability(doc);
    res.redirect('/user');
}

module.exports.userinfo = (req, res) => {
    const session = req.session.Userinfo;
    let obj = {
        title : 'User Info',
        datenow : new Date()
    }
    obj = getsessiondata(req, obj);
    res.render('user/userinfo', obj);
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
}

module.exports.listUsers = async (req, res) => {
    const users = await userModel.get({});
    let obj = {
        title : 'Manage Users',
        users : users
    }
    obj = getsessiondata(req, obj);
    res.render('user/listuser', obj);
}

module.exports.detailUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const user = await userModel.getOne({_id: user_id});
        const obj = {
            title : 'Edit user',
            user : user
        }
        res.render('user/detail', obj);
    } catch (e) {
        res.sendStatus(404, 'application/json', 'User not found!');
    }
}

module.exports.editUser = async (req, res) => {
    const find = {_id : req.body._id}
    const newobj = {
        password : req.body.password,
        email : req.body.email,
        role_id : req.body.role,
        salt : ''
    }
    try {
        await userModel.update(find, newobj);
        return res.redirect('/user/list')
    } catch (e) {
        res.sendStatus(500, 'application/json', 'Error');
    }
}

module.exports.removeUser = async (req, res) => {
    const find = {_id : req.body._id}
    try {
        await userModel.remove(find);
        return res.redirect('/user/list')
    } catch (e) {
        res.sendStatus(500, 'application/json', 'Error');
    }
}
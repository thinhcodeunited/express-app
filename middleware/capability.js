const capabilities = (req, res, next) => {
    const session = req.session.Userinfo;
    const capability = {
        manage_user : {
            create_user : true,
            edit_user : true,
            remove_user : true
        },
        manage_post : {
            create_post : true,
            edit_post : true,
            remove_post : true,
        }
    }
    if (session.role_id.role !== 'admin') {
        capability.manage_user = false;
        capability.manage_post.remove_post = false;
    }

    req.myapp_data = {
        username : session.username,
        email : session.email,
        role_name : session.role_id.name,
        createAt : new Date(session.createAt),
        capability : capability
    }
    next();
}

const isAllowViewUsers = (req, res, next) => {
    if (!req.myapp_data || !req.myapp_data.capability.manage_user) {
        return res.redirect('/userinfo');
    }
    next();
}
module.exports = {capabilities, isAllowViewUsers};
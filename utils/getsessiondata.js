const getsessiondata = (req, oldobj) => {
    const session = req.session.Userinfo;
    const obj = {
        username : session.user.username,
        email : session.user.email,
        role_name : session.user.role_id.name,
        createAt : new Date(session.user.createAt).toLocaleString("Vi"),
        capability : {
            manage_user: session.manage_user,
            manage_post: session.manage_post
        },
        dateNow : new Date(Date.now()).toLocaleString("Vi")
    }
    return {...oldobj, ...obj};
}

module.exports = {getsessiondata}
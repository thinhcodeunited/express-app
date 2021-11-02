const getsessiondata = (req, oldobj) => {
    const session = req.session.Userinfo;
    let obj = {}
    if (!session) {
        obj = {
            username : 'Guest',
            email : 'guest@gmail.com',
            role_name : 'guest',
            createAt : new Date(Date.now()).toLocaleString("Vi"),
            capability : {
                manage_user: false,
                manage_post: false
            },
            dateNow : new Date(Date.now()).toLocaleString("Vi")
        }
    } else {
        obj = {
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
    }
    
    return {...oldobj, ...obj};
}

module.exports = {getsessiondata}
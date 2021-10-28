const isAllowViewUsers = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_user) {
        return res.redirect('/user');
    }
    next();
}

const isAllowEditUsers = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_user || !session.manage_user.edit_user) {
        return res.redirect('/user');
    }
    next();
}

const isAllowRemoveUsers = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_user || !session.manage_user.remove_user) {
        return res.redirect('/user');
    }
    next();
}

module.exports = {isAllowViewUsers, isAllowEditUsers, isAllowRemoveUsers};
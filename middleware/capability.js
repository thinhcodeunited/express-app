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

const isAllowViewPosts = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_post) {
        return res.redirect('/user');
    }
    next();
}

const isAllowCreatePost = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_post || !session.manage_post.create_post) {
        return res.redirect('/user');
    }
    next();
}

const isAllowEditPost = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_post || !session.manage_post.edit_post) {
        return res.redirect('/user');
    }
    next();
}

const isAllowRemovePost = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_post || !session.manage_post.remove_post) {
        return res.redirect('/user');
    }
    next();
}

module.exports = {
    isAllowViewUsers,
    isAllowEditUsers,
    isAllowRemoveUsers,
    isAllowViewPosts,
    isAllowCreatePost,
    isAllowEditPost,
    isAllowRemovePost
};
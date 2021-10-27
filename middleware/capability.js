

const isAllowViewUsers = (req, res, next) => {
    const session = req.session.Userinfo;

    if (!session || !session.manage_user) {
        return res.redirect('/user');
    }
    next();
}
module.exports = {isAllowViewUsers};
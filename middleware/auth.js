const isAuthenticated = (req, res, next) => {
    const session = req.session.Userinfo;

    if (req.originalUrl === '/login') {
        if (session) {
            return res.redirect('/user')
        }
        next();
    }

    if (!session) return res.redirect('/login');
    next();
}
module.exports = {isAuthenticated};
const Auth = {
    check_loginAdmin: (req, res, next) =>
    {
        if (!req.session.logged_in) {
            return res.redirect('/loginAdmin')
        }
        next();
    },
    sudah_loginAdmin : (req, res, next) => {
        if (req.session.logged_in) return res.redirect('/admin')
        next()
    }

}

module.exports = Auth;
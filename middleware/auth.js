// passport.js middleware for authentication:
module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/')
		}
	}
}

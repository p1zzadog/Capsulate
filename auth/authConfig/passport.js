var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../authModel/user.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// update localStrategy to remove information from error message
localStrategy = new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) {
			return done(null, false, { message: 'Incorrect username or password.' });
		}
		user.comparePassword(password, function(err, isMatch){
			if (isMatch) return done(null, user);
			else {
				return done(null, false, { message: 'Incorrect username or password.' });
			};
			
		});
	});
});

passport.use(localStrategy);
		
var ensureAuth = function(req, res, next){
	console.log('ensureAuth: req.isAuthenticated', req.isAuthenticated())
	if (req.isAuthenticated()) return next();

	res.redirect('/#/auth/login/login');

};

var ensureAuthAjax = function(req, res, next){
	console.log('ensureAuthAjax, req is Auth?', req.isAuthenticated());
	if (req.isAuthenticated()) return next();
	console.log('ensureAuthAjax: session not authenticated')
	res.send({error: "session not authenticated"});
};


module.exports = {
	ensureAuth     : ensureAuth,
	ensureAuthAjax : ensureAuthAjax,
}
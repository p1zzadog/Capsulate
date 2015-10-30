var passport = require('passport');
var User = require('../authModel/user.js');

var performLogin = function(req, res, next, user){
  req.login(user, function(err){
    if(err) return next(err);
    return res.send({success:"Signup successful"});
  });
};

var processLogin = function(req, res, next){
  console.log('processLogin function fires');
    var authFunction = passport.authenticate('local', function(err, user, info){

      if(err) return next(err);
      if(!user) {
        return res.send({error: 'Error logging in. Please try again.'});
      }
      performLogin(req, res, next, user);
    });
    authFunction(req, res, next);
  };

var processSignup = function(req, res, next){
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    user.save(function(err, user){
      if(err) {
        if(err.code === 11000){
		      return res.send({error : 'This user already exists.'})
        }
		    else{
          console.log(err);
		      return res.send({error : '123An error occured, please try again'})
        }
      }
      performLogin(req, res, next, user);
    });
  };

var logout = function(req, res){
  req.logout();
  res.redirect('/');
};


module.exports = {
  processLogin  : processLogin,
  processSignup : processSignup,
  logout        : logout,
}

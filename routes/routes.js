var express = require('express');
var router = express.Router();
var ensureAuth = require('../auth/authConfig/passport.js').ensureAuth;
var ensureAuthAjax = require('../auth/authConfig/passport.js').ensureAuthAjax;
var authControl = require('../auth/authController/authControl.js');
var capsuleControl = require('../controllers/capsuleControl.js');

// view routes
router.get('/', function(req, res){
	res.sendFile('/html/index.html', {root: './public'});
});

router.get('/view/dash', ensureAuth, function(req, res){
	console.log('/view/dash handler');
	res.redirect('/#/view/dash');
});

// auth routes
router.get('/auth/check', ensureAuthAjax, function(req, res){
	console.log('/auth/check route');
	res.send({success:'session is authenticated'});
});
router.post('/auth/process-login', authControl.processLogin);
router.post('/auth/register-user', authControl.processSignup);
router.get('/auth/logout', authControl.logout);

// api routes
router.get('/api/me', ensureAuthAjax, function(req, res){
	res.send({ user : req.user.username});
})
router.post('/api/create-capsule', ensureAuthAjax, capsuleControl.createCapsule);


module.exports = router;
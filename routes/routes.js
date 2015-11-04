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

// auth routes
router.get('/auth/check', ensureAuthAjax, function(req, res){
	res.send({success:'session is authenticated'});
});
router.post('/auth/process-login', authControl.processLogin);
router.post('/auth/register-user', authControl.processSignup);
router.get('/auth/logout', authControl.logout);

// api routes
router.get('/api/me', ensureAuthAjax, function(req, res){
	res.send({ user : req.user.username});
});
router.post('/api/create-capsule', ensureAuthAjax, capsuleControl.createCapsule);
router.get('/api/get-capsules', ensureAuthAjax, capsuleControl.getCapsules);
router.get('/api/get-invites', ensureAuthAjax, capsuleControl.getInvites);
router.get('/api/get-shared', ensureAuthAjax, capsuleControl.getShared);
router.get('/api/open-capsule/:capsuleId', ensureAuthAjax, capsuleControl.ensureUnlocked);
router.get('/api/open-invite/:capsuleId', ensureAuthAjax, capsuleControl.ensureInviteUnlocked);
router.get('/api/open-shared/:capsuleId', ensureAuthAjax, capsuleControl.ensureSharedUnlocked);
router.post('/api/submit-contribution', ensureAuthAjax, capsuleControl.submitContribution);
router.get('/api/get-contributions/:capsuleId', ensureAuthAjax, capsuleControl.getContributions);


module.exports = router;
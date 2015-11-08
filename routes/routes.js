var express = require('express');
var router = express.Router();
var ensureAuth = require('../auth/authConfig/passport.js').ensureAuth;
var ensureAuthAjax = require('../auth/authConfig/passport.js').ensureAuthAjax;
var authControl = require('../auth/authController/authControl.js');
var capsuleControl = require('../controllers/capsuleControl.js');
var multer = require('multer');
var s3 = require('multer-s3');
var awsKeys = require('../awsKeys.js');

var upload = multer({
	storage : s3({
		dirname         : '/uploads/photos',
		bucket          : 'encapsulate',
		secretAccessKey : awsKeys.secret,
		accessKeyId     : awsKeys.access,
		region          : 'Oregon',
		filename        : function(req, file, cb){
			console.log('multer upload storage filename cb')
			cb(null, Date.now())
		},
	}),
});

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


router.post('/api/upload-photo', ensureAuthAjax, upload.single('photo'), function(req, res, next){
	res.send('/api/upload-photo maybe success??');
});


router.get('/api/get-capsules', ensureAuthAjax, capsuleControl.getCapsules);
router.get('/api/get-invites', ensureAuthAjax, capsuleControl.getInvites);
router.get('/api/get-shared', ensureAuthAjax, capsuleControl.getShared);
router.get('/api/open-capsule/:capsuleId', ensureAuthAjax, capsuleControl.ensureUnlocked);
router.get('/api/open-invite/:capsuleId', ensureAuthAjax, capsuleControl.ensureInviteUnlocked);
router.get('/api/open-shared/:capsuleId', ensureAuthAjax, capsuleControl.ensureSharedUnlocked);
router.post('/api/submit-contribution', ensureAuthAjax, capsuleControl.submitContribution);
router.get('/api/get-contributions/:capsuleId', ensureAuthAjax, capsuleControl.getContributions);


module.exports = router;
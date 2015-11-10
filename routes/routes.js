var express = require('express');
var fs = require('fs');
var router = express.Router();
var ensureAuth = require('../auth/authConfig/passport.js').ensureAuth;
var ensureAuthAjax = require('../auth/authConfig/passport.js').ensureAuthAjax;
var authControl = require('../auth/authController/authControl.js');
var capsuleControl = require('../controllers/capsuleControl.js');
var multer = require('multer');

// using an s3 storage engine for multer, uses .env file for aws keys
var s3 = require('multer-storage-s3');
var storage = s3({
    destination : function( req, file, cb ) {        
      cb( null, 'capsulate-uploads/' );        
    },
    filename    : function( req, file, cb ) {
      // only works for .jpg right now, need to support other image types
      var fileExtension = function(){
        if (file.mimetype==='image/jpeg'){
          return '.jpg'
        };
      };        
      cb( null, Date.now() + fileExtension() );        
    },
    bucket      : 'encapsulate',
    region      : 'us-west-2',

});
var uploadMiddleware = multer({ storage: storage });

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
// upload.single('string') string needs to be name of object key being sent from front end
router.post('/api/upload-photo', ensureAuthAjax, uploadMiddleware.single('file'), capsuleControl.attachPhotoUrl);
router.get('/api/get-capsules', ensureAuthAjax, capsuleControl.getCapsules);
router.get('/api/get-invites', ensureAuthAjax, capsuleControl.getInvites);
router.get('/api/get-shared', ensureAuthAjax, capsuleControl.getShared);
router.get('/api/open-capsule/:capsuleId', ensureAuthAjax, capsuleControl.ensureUnlocked);
router.get('/api/open-invite/:capsuleId', ensureAuthAjax, capsuleControl.ensureInviteUnlocked);
router.get('/api/open-shared/:capsuleId', ensureAuthAjax, capsuleControl.ensureSharedUnlocked);
router.post('/api/submit-contribution', ensureAuthAjax, capsuleControl.submitContribution);
router.get('/api/get-contributions/:capsuleId', ensureAuthAjax, capsuleControl.getContributions);


module.exports = router;
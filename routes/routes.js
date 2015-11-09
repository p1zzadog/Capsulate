var express = require('express');
var router = express.Router();
var ensureAuth = require('../auth/authConfig/passport.js').ensureAuth;
var ensureAuthAjax = require('../auth/authConfig/passport.js').ensureAuthAjax;
var authControl = require('../auth/authController/authControl.js');
var capsuleControl = require('../controllers/capsuleControl.js');
var multer = require('multer');
var s3 = require('s3');
var awsKeys = require('../awsKeys.js');
var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default 
  s3RetryCount: 3,    // this is the default 
  s3RetryDelay: 1000, // this is the default 
  multipartUploadThreshold: 20971520, // this is the default (20 MB) 
  multipartUploadSize: 15728640, // this is the default (15 MB) 
  s3Options: {
    accessKeyId: awsKeys.access,
    secretAccessKey: awsKeys.secret,
    // any other options are passed to new AWS.S3() 
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
  },
});
var upload = multer({ dest: './uploads/photos'});
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
//     	cb(null, './tmp/uploads/photos')
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	},
// });
// var upload = multer({
// 	storage: storage,
// });


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
router.post('/api/upload-photo', ensureAuthAjax, upload.single('file'), function(req, res, next){
	console.log(req.file);

	var fileExtension = function(){
		if (req.file.mimetype==='image/jpeg'){
			return '.jpg'
		};
	};

	var params = {
  		localFile: "./uploads/photos/" + req.file.filename,
 		s3Params: {
    		Bucket: "encapsulate",
    		Key: String(req.body.capsuleId) + fileExtension(),
    		// other options supported by putObject, except Body and ContentLength. 
    		// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
  		},
	};
	var uploader = client.uploadFile(params);
	uploader.on('error', function(err) {
  		console.error("unable to upload:", err.stack);
	});
	uploader.on('progress', function() {
  		console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
	});
	uploader.on('end', function() {
  		console.log("done uploading");
	});
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
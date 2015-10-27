var express = require('express');
var router = express.Router();

router.get('/auth/process-login', function(req, res){
	res.send('process-login route response');
});

router.get('/auth/register-user', function(req, res){
	res.send('register-user route response');
});

module.exports = router;
var Capsule = require('../models/capsules.js');

var createCapsule = function(req, res, next){
	console.log('createCapsule runs')
	var newCapsule = new Capsule({
		capsuleName : req.body.capsuleName,
		username : req.user.username,
		nickname : req.body.nickname,
		celebrityCrush : req.body.celebrityCrush,
		futureOccupation : req.body.futureOccupation,
		inviteFriends : req.body.inviteFriends,
		unlockDate : req.body.unlockDate,
		locked : req.body.locked
	});

	newCapsule.save(function(err, document){
		if (err){
			console.log(err);
			res.send({error: "sorry, there was an error"});
		}
		else{
			console.log(document);
			res.send({success: "the capsule was created!"})
		}
	});
};

var getCapsules = function(req, res, next){
	Capsule.find({username:req.user.username}, function(err, docs){
		if (!err){
			res.send({capsules : docs});
		}
		else{
			res.send({error: 'no capsules found'});
		};
	});
};

var getInvites = function(req, res, next){
	Capsule.find({inviteFriends:req.user.email}, function(err, docs){
		if (!err){
			console.log('getInvites capsules: ', docs)
			res.send({capsules : docs});
		}
		else{
			res.send({error: 'no capsules found'});
		}
	})
};

module.exports = {
	createCapsule : createCapsule,
	getCapsules   : getCapsules,
	getInvites    : getInvites,
}
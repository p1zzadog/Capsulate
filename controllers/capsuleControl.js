var Capsule = require('../models/capsules.js');

var createCapsule = function(req, res, next){
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
			res.send({error: "sorry, there was an error"});
		}
		else{
			res.send({success: "the capsule was created!"})
		}
	});
};

var getCapsules = function(req, res, next){
	Capsule.find({username:req.user.username}, function(err, docs){
		if (!err){
			res.send({capsules : docs.map(function(doc){
				return {
					capsuleName : doc.capsuleName,
					unlockDate  : doc.unlockDate,
					_id         : doc._id,
					locked      : doc.locked
				};
			})});
		}
		else{
			res.send({error: 'no capsules found'});
		};
	});
};

var getInvites = function(req, res, next){
	Capsule.find({inviteFriends:req.user.email}, function(err, docs){
		if (!err){
			res.send({capsules : docs.map(function(doc){
				return {
					capsuleName : doc.capsuleName,
					username    : doc.username,
					unlockDate  : doc.unlockDate,
					_id         : doc._id,
					locked      : doc.locked
				};
			})});
		}
		else{
			res.send({error: 'no capsules found'});
		}
	})
};

var ensureUnlocked = function(req, res, next){
	Capsule.findOne({_id:req.params.capsuleId, username : req.user.username}, function(err, docs){
		if (!err){
			res.send(docs);
		}
		else{
			res.send({error: 'capsule not found'});
		}
	})
}

module.exports = {
	createCapsule  : createCapsule,
	getCapsules    : getCapsules,
	getInvites     : getInvites,
	ensureUnlocked : ensureUnlocked,
}
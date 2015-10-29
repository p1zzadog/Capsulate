var Capsule = require('../models/capsules.js');

var createCapsule = function(req, res, next){
	console.log('createCapsule runs')
	var newCapsule = new Capsule({
		username : req.user.username,
		nickname : req.body.nickname,
		celebrityCrush : req.body.celebrityCrush,
		futureOccupation : req.body.futureOccupation,
		unlockDate : req.body.unlockDate
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

module.exports = {
	createCapsule : createCapsule,
}
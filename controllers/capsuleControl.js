var Capsule      = require('../models/capsules.js').Capsule;
var Contribution = require('../models/capsules.js').Contribution;
var sendInvite   = require('../senderDaemon.js').sendInvite;
var _            = require('lodash');



var createCapsule = function(req, res, next){
	// utility function
	var checkForInvites = function(newDocument, user){
		if (newDocument.inviteFriends.length > 0) {
			newDocument.inviteFriends.forEach(function(friend){
			sendInvite(friend, user);
			});
		};
	};
	
	var inviteLocked = function(invites) {
		var inviteLockedArray = [];
		if (invites.length>0) {
			invites.forEach(function(invite){
				inviteLockedArray.push({inviteLocked:false, inviteEmail:invite});
			});
			return inviteLockedArray;
		};
	};

	var newCapsule = new Capsule({
		capsuleName : req.body.capsuleName,
		username : req.user.username,
		nickname : req.body.nickname,
		celebrityCrush : req.body.celebrityCrush,
		futureOccupation : req.body.futureOccupation,
		inviteFriends : req.body.inviteFriends,
		unlockDate : req.body.unlockDate,
		locked : true,
		inviteLocked : inviteLocked(req.body.inviteFriends),
	});

	newCapsule.save(function(err, document){
		if (err){
			console.log(err)
			res.send({error: "sorry, there was an error"});
		}
		else{
			// -=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// MAKE SURE TO UN-COMMENT THIS TO SEND EMAILS TO CONTRIBUTERS
			// -=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			// checkForInvites(document, req.user);
			res.send({success: "the capsule was created!"})
		}
	});
};

var getCapsules = function(req, res, next){
	Capsule.find({username:req.user.username}, function(err, docs){
		if (!err){
			res.send({capsules : docs.map(function(doc){
				return {
					capsuleName  : doc.capsuleName,
					unlockDate   : doc.unlockDate,
					_id          : doc._id,
					locked       : doc.locked,
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
					capsuleName  : doc.capsuleName,
					username     : doc.username,
					unlockDate   : doc.unlockDate,
					_id          : doc._id,
					locked       : doc.locked,
					inviteLocked : _.find(doc.inviteLocked, function(invite){
						return (invite.inviteEmail === req.user.email);
					}),
				};
			})});
		}
		else{
			res.send({error: 'no capsules found'});
		}
	})
};

var ensureUnlocked = function(req, res, next){
	Capsule.findOne({_id:req.params.capsuleId, username : req.user.username}, function(err, doc){
		if (!err){
			if (doc.locked === false){
				res.send(doc);
			}
			
		}
		else{
			res.send({error: 'capsule not found'});
		}
	})
};

var ensureInviteUnlocked = function(req, res, next){
	// find the capsule
	Capsule.findOne({_id:req.params.capsuleId, inviteFriends : req.user.email}, function(err, doc){
		if (!err){
			// if the invite is still open
			if (_.find(doc.inviteLocked, function(invite){
				// but first make sure authenticated user has contribution priveledges
				 if (invite.inviteEmail === req.user.email) {
				 	return !invite.inviteLocked;
				 }

			})){
				res.send({success: 'capsule is available for contribution'});
			}
			else {
				res.send({error: 'this capsule can no longer be contributed to'});
			}
		}
		else{
			res.send({error: 'capsule not found'});
		}
	})
};

var submitContribution = function(req, res, next) {
	Capsule.findOne({_id:req.body.capsuleId, inviteFriends : req.user.email}, function(err, doc){
		if (!err){
			if (_.find(doc.inviteLocked, function(invite){
				if (invite.inviteEmail === req.user.email){
					return !invite.inviteLocked;
				}
			})){
				var newContribution = new Contribution({
				capsuleId : req.body.capsuleId,
				username  : req.user.username,
				email     : req.user.email,
				sample1   : req.body.sample1,
				sample2   : req.body.sample2,
				sample3   : req.body.sample3,
				sample4   : req.body.sample4,
				})

				newContribution.save(function(err, contribution){
					if (err){
						console.log(err);
						res.send({error: "sorry, there was an error"});
					}
					else {
						_.find(doc.inviteLocked, function(invite){
							if (invite.inviteEmail === req.user.email){
								invite.inviteLocked = true;
								doc.markModified('inviteLocked');
							};
						});
						doc.contributions.push(contribution._id);
						doc.save();
						res.send({success: "contribution created!"});
					};
				});
			}
			else {
				res.send({error: "this capsule can no longer be contributed to"});
			};
		}
		else {
			res.send({error: "capsule not found"});
		};
	});
};

module.exports = {
	createCapsule        : createCapsule,
	getCapsules          : getCapsules,
	getInvites           : getInvites,
	ensureUnlocked       : ensureUnlocked,
	ensureInviteUnlocked : ensureInviteUnlocked,
	submitContribution   : submitContribution,
}
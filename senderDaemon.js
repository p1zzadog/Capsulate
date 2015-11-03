var key = require('./sendgrid-api-key.js');
var sendgrid = require('sendgrid')(key);
var Capsule = require('./models/capsules.js').Capsule;
var mongoose = require('mongoose');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour=19;
rule.minute=00;

var job = schedule.scheduleJob(rule, function(){
	var today = new Date();
	
	Capsule.find({
		unlockDate : {$lt : today},
		locked     : true
	}, function(err, docs){
		if (err) console.log('err in db search: ', err);
		if (!err) {
			docs.forEach(function(doc){
				var payload   = {
 					to      : 'steve.moody2@gmail.com',
  					from    : 'steve06m@huskers.unl.edu',
  					subject : 'Saying Hi',
 					text    : 'Hello ' + doc.username + ', Your capsule '+ doc.capsuleName +' has unlocked! Visit Encapsulate!',
				};

				sendgrid.send(payload, function(err, json) {
  					if (err) { console.error(err); }
				});

				doc.locked = false;
				doc.save();
			});
		};		
	});
});

var sendInvite = function(emailAddressTo, userFrom) {
	var payload   = {
 		to      : emailAddressTo,
  		from    : userFrom.email,
  		subject : 'Invite to contribute to ' + userFrom.username + "'s time capsule!",
 		text    : 'Hello, ' +  userFrom.username + ' has invited you to contribute your thoughts to their time capsule. Please login or create an account with this email at <link>, then check your invites!',
	};

	sendgrid.send(payload, function(err, json) {
  		if (err) { console.error(err); }
	});
}

module.exports = {
	job        : job,
	sendInvite : sendInvite,
};

var key = require('./sendgrid-api-key');
var sendgrid = require('sendgrid')(key);
var Capsule = require('./models/capsules.js');
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

module.exports = job;
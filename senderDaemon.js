var key = require('./sendgrid-api-key');
var sendgrid = require('sendgrid')(key);
var Capsule = require('./models/capsules.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/encapsulate');

console.log('senderDaemon');

Capsule.find({username:"steve06m"}, function(err, doc){
	console.log('mongoose find callback')
	console.log('err',err);
	console.log('doc',doc);
	if (!err){
		console.log('doc found, sending email');
		var payload   = {
 			to      : 'steve.moody2@gmail.com',
  			from    : 'steve06m@huskers.unl.edu',
  			subject : 'Saying Hi',
 			text    : 'key test',
		}

		sendgrid.send(payload, function(err, json) {
  		if (err) { console.error(err); }
  		console.log(json);
		});

	}
	else console.log(err)
});


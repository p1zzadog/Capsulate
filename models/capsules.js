var mongoose = require('mongoose');

var capsuleSchema = mongoose.Schema({
		capsuleName      : {type : String, required : true},
		username         : {type : String},
		nickname         : {type : String},
		celebrityCrush   : {type : String},
		futureOccupation : {type : String},
		inviteFriends    : {type : Array},
		unlockDate       : {type : Date,  required : true},
		locked           : {type : Boolean, required : true},
		inviteLocked     : {type : Array},
});

var Capsule = mongoose.model('Capsule', capsuleSchema);

module.exports = Capsule;
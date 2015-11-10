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
	contributions    : {type : Array},
	currentLocation  : {type : String},
	bestSong         : {type : String},
	recentMemory     : {type : String},
	bestThing        : {type : String},
	personalMessage  : {type : String},
	creationDate     : {type : Date},
	photoUrl         : {type : String},

});

var Capsule = mongoose.model('Capsule', capsuleSchema);

var contributionSchema = mongoose.Schema({
	capsuleId         : {type : mongoose.Schema.ObjectId, ref:'Capsule'},
	username          : {type: String},
	email             : {type: String},
	recentMemory      : {type: String},
	badAt             : {type: String},
	goodAt            : {type: String},
	personalMessage   : {type: String},
})

var Contribution = mongoose.model('Conribution', contributionSchema);

module.exports = {
	Capsule      : Capsule,
	Contribution : Contribution,
};
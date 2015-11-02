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
});

var Capsule = mongoose.model('Capsule', capsuleSchema);

var contributionSchema = mongoose.Schema({
	capsuleId : {type : mongoose.Schema.ObjectId, ref:'Capsule'},
	username  : {type: String},
	email     : {type: String},
	sample1   : {type: String},
	sample2   : {type: String},
	sample3   : {type: String},
	sample4   : {type: String},
})

var Contribution = mongoose.model('Conribution', contributionSchema);

module.exports = {
	Capsule      : Capsule,
	Contribution : Contribution,
};
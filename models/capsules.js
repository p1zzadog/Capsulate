var mongoose = require('mongoose');

var capsuleSchema = mongoose.Schema({
		username         : {type : String},
		nickname         : {type : String},
		celebrityCrush   : {type : String},
		futureOccupation : {type : String},
		unlockDate       : {type : Date,  required : true},
		locked           : {type : Boolean, required : true}
});

var Capsule = mongoose.model('Capsule', capsuleSchema);

module.exports = Capsule;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trgovinaSchema = new Schema({
	'Naziv' : String,
	'Celoten_naziv' : String,
	'Naslov' : String,
	'Posta' : Number,
	'Kraj' : String,
	'Lastnik' : String,
	'Spletna_stran' : String
}, {timestamps: true});

trgovinaSchema.pre('save', function(next){
	var trgovina = this;
	next();
});
var Trgovina = mongoose.model('Trgovina', trgovinaSchema);
module.exports = Trgovina;

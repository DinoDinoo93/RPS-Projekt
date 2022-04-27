var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var trgovinaSchema = new Schema({
	'Naziv' : String,
	'Celoten_naziv' : String,
	'Naslov': String,
	'Spletna_stran' : String	
});



trgovinaSchema.pre('save', function(next){
	var trgovina = this;
	next();
});

var Trgovina = mongoose.model('Trgovina', trgovinaSchema);
module.exports = Trgovina;

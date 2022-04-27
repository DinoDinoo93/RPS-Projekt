var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var izdelekSchema = new Schema({
	'id_trgovine' : Object,
	'Naziv' : String,
	'Vrsta': String,
	'Opis' : String,
	'Slika' : String	
});



izdelekSchema.pre('save', function(next){
	var izdelek = this;
	next();
});

var Izdelek = mongoose.model('Izdelek', izdelekSchema);
module.exports = Izdelek;

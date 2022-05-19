var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var izdelekSchema = new Schema({
	'id_trgovine' :  String,
	'Naziv' : String,
	'Vrsta' : String,
	'Opis' : String,
	'Podjetje' : String,
	'Slika' : String,
	'Kategorija' : String,
	'id_izdelek' : String // za pobiranje ID-ja iz spletne strani (na spletni strani ima izdelek svoj ID)
});

izdelekSchema.pre('save', function(next){
	var izdelek = this;
	next();
});

var Izdelek = mongoose.model('Izdelek', izdelekSchema);
module.exports = Izdelek;

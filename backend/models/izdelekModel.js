var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var izdelekSchema = new Schema({
	'id_trgovine' :  String,
	'Naziv' : String,
	'Vrsta' : String,
	'Opis' : String,
	'Slika' : String,
	'Kategorija' : String,
	"id_izdelka" : String
});

izdelekSchema.pre('save', function(next){
	var izdelek = this;
	next();
});

var Izdelek = mongoose.model('Izdelek', izdelekSchema);
module.exports = Izdelek;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var cenaSchema = new Schema({
	'id_izdelka' : String,
	'Datum_cas' : Date,
	'Cena' : Number
});

cenaSchema.pre('save', function(next){
	var cena = this;
	next();
});

var Cena = mongoose.model('Cena', cenaSchema);
module.exports = Cena;
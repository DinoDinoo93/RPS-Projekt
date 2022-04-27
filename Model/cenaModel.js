var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var cenaSchema = new Schema({
	'id_izdelka' : Object,
	'Datum_cas' : Date,
	'Cena': Double 	
});



cenaSchema.pre('save', function(next){
	var cena = this;
	next();
});

var Cena = mongoose.model('Cena', cenaSchema);
module.exports = Cena;

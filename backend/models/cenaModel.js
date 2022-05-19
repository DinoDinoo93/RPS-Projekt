var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var cenaSchema = new Schema({
	'id_izdelka' : String,
	'Cena' : Number,
	'id_izdelek' : String // id izdelka iz spletne strani
}, {timestamps: true});

cenaSchema.pre('save', function(next){
	var cena = this;
	next();
});

var Cena = mongoose.model('Cena', cenaSchema);
module.exports = Cena;

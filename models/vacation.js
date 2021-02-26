const mongoose = require('mongoose');


const vacationSchema = mongoose.Schema({
  name: String,
	slug: String,
	category: String,
	sku: String,
	description: String,
	location: {
		search: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
	},
	price: Number,
	tags: [String],
	inSeason: Boolean,
  available: Boolean,
	maximumGuests: Number,
	packagesSold: Number,
});

// definindo um modelo que é tratado como Classe
const Vacation = mongoose.model('Vacation', vacationSchema);


module.exports = Vacation

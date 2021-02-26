const credentials = require('./.credentials');

// initialize database connection
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || "development";
const { connectionString } = credentials.mongo

if (!connectionString) {
  console.error('MongoDB connection string missiong!');
  process.exit(1);
}

mongoose.connect(connectionString, { useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', err => {
  console.error('MongoDB error: ' + err.message);
  process.exit(1);
});

db.once('open', () => console.log('MongoDb connection established'));




module.exports = {
  getVacations: async (options ={}) => {
    // simulando alguns dados de férias
    const vacations = [{
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description: 'Spend a day sailing on the Columbia and enjoying craft beers in Hood River',
        location: {
          // futuramente esta parte pode receber
          // dados de geolocalizaçãoptimize
          search: 'Hood River, Oregon, USA',
        },
        price: 99.95,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
      }
    ];
  },
  addVactionInListener: async (email, sku) => {
    // por enquanto esta tarefa estará vazia e por causa
    // disso, esta função assíncrona irá retornar um
    // undefined
  },
}

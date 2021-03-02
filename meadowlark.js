const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

//const { credentials } = require('./config');
const handlers = require('./lib/handlers');
const weatherMiddlware = require('./lib/middleware/weather');

const cors = require('cors');

const app = express();

app.use('/api', cors());

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cookieParser(credentials.cookieSecret));
// Certifique-se de conectar o middleware de cookieSecret
// antes deste middleware de sessões!
// app.use(expressSession({
//   resave: false,
//   saveUninitialized: false,
//   secret: creditials.cookieSecret,
// }));


const port = process.env.PORT || 3033;

app.use(express.static(__dirname + '/public'));


// Para o uso de Partials dentro de Views
app.use(weatherMiddlware);


// página inicial
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/', handlers.home);

app.get('/vacations', handlers.listVacations);


// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

// vacation photo contest
app.get('/contest/vacation-photo', handlers.vacationPhotoContest);
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return handlers.vacationPhotoContestProcessError(req, res, err.message);
    console.log('got fields: ', fields);
    console.log('and files: ', files);
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax);
app.post('/api/vacation-photo-process-ajax/:year/:month', (req, res) => {
  const form = new Multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return handlers.api.vacationPhotoAjaxError(req, res, err, message);
    }
    handlers.api.vacationPhotoAjax(req, res, fields, files);
  });
});

app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou);


// rotas dos testes da API do site
app.get('/api/vacations', handlers.getVacationApi);
app.get('/api/vacation/:sku', handlers.getVacationBySkuApi);
app.post('/api/vacation/:sku/notify-when-in-season', handlers.addVacationInSeasonListernerApi);
app.delete('/api/vation/:sku', handlers.requestDeleteVacationApi);





// página About
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/about', handlers.about);

// páginas 404 e 500 personalizadas
app.use(handlers.notFound);
app.use(handlers.serverError);

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started in ${app.get('env')} mode at http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  });
} else {
  module.exports = app
}

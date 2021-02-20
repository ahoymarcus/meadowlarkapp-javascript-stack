const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// configurando a View engine Handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// página inicial
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/', (req, res) => res.render('home'));




// página About
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
});

// página 404 personalizada
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// página 500 personalizada
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});


app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` + `press Ctrl+C to terminate...`
));

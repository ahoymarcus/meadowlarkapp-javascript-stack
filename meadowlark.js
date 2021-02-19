const express = require('express');



const app = express();
const port = process.env.PORT || 3000;


// página inicial
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Meadowlark Travel');
});

// página About
// O mét app desconsidera case, / e a querystring
// código 200 é default no Express
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});

// página 404 personalizada
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// página 500 personalizada
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate...`
));

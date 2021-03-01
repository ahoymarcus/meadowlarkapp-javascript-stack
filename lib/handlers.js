const fortune = require('./fortune');
const db = require('../db');


exports.api = {}

exports.home = (req, res) => res.render('home');
exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() });


exports.listVacations = async (req, res) => {
  const vacations = await db.getVacations()
  const context = {
    vacations: vacations.map(vacation => {
      return {
        sku: vacation.sku,
        name: vacation.name,
        description: vacation.description,
        inSeason: vacation.inSeason,
        price: vacation.price,
      }
    })
  }
  res.render('vacations', context)


  //res.render('vacations');
};



// BEGIN: these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};
exports.newsletterSignupProcess = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
// END: browser-submitted form handlers


// BEGIN: these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter', { csrf: 'CSRF token goes here' });
}
exports.api.newsletterSignup = (req, res) => {
  console.log('CSRF token (from hidden JSON form field): ' + req.body._csrf);
  console.log('Name (from visible JSON form field): ' + req.body.name);
  console.log('Email (from visible JSON form field): ' + req.body.email);
  res.send({ result: 'success' });
}
// END: fetch/JSON form handlers



// BEGIN: contest
exports.vacationPhotoContest = (req, res) => {
  const now = new Date();

  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
};
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('field data: ', fields);
  console.log('files: ', files);
  res.redirect(303, '/contest/vacation-photo-thank-you');
};
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
  res.redirect(303, '/contest/vacation-photo-error');
};
exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you');
};

exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date();
  res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() });
};
exports.api.vacationPhotoAjax = (req, res, fields, files) => {
  console.log('field data: ', fields);
  console.log('files: ', files);
  res.send({ result: 'successs' });
};
exports.api.vacationPhotoAjaxError = (req, res, message) => {
  res.send({ result: 'error', error: message });
};
// END: contest


// BEGIN: das rotas de teste da API do site meadowlarktravel
exports.getVacationApi = async (req, res) => {
  const vacations = await db.getVacation({ available: true });
  res.json(vacations);
};

exports.getVacationBySkuApi = async (req, res) => {
  const vacation = await db.getVacationBySku(req.paras.sku);
  res.json(vacation);
};

exports.addVacationInSeasonListernerApi = async (req, res) => {
  await db.addVacationInSeasonListerner(req.params, req.body.email);
  res.joson({ message: 'success' });
};

exports.requestDeleteVacationApi = async (req, res) => {
  const { email, notes} = req.body;
  res.status(500).json({ message: 'not  yet implemented' });
};
// END: das rotas de teste da API do site meadowlarktrave






exports.notFound = (req, res) => res.render('404');

// Express recognizes the error handler by way of its four
// argumetns, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500');
/* eslint-enable no-unused-vars */

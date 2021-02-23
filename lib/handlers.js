const fortune = require('./fortune');


exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() });

// BEGIN: these handlers are for browser-submitted forms
exports.newsletterSingup = (req, res) => {
  // valor mock de CSFR
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};
exports.newsletterSignupProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) => {
  res.render('newsletter-signup-thank-you');
}
// END: browser-submitted form handlers




exports.notFound = (req, res) => res.render('404');
exports.serverError = (err, req, res, next) => res.render('500');

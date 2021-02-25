const nodemailer = require('nodemailer');
const credentials = require('./.credentials');


const mailTransport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  auth: {
    user: credentials.mailtrap.user,
    pass: credentials.mailtrap.password,
  },
});


async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
      to: '682bb86f1c-ceda9f@inbox.mailtrap.io',
      subject: 'Your Meadowlark Travel Tour',
      text: 'Thank you for booking your trip with Meadowlark Travel. ' + 'We look forward to your visit',
    });
    console.log('mail sent successfully: ', result);
  } catch(err) {
    // Atente que esse tratamento de erro captura apenas error de rede ou de autenticação
    console.log('could not send mail: ' + err.message);
  }
};

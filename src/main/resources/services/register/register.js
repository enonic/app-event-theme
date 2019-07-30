const libMail = require('/lib/xp/mail');

exports.post = function(req) { // /_/service/app.event.theme/contact
  /* log.info('register.js JSON %s', JSON.stringify(req.params), null, 4); */

  var flag1 = libMail.send({
    from: req.params.fromEmail,
    to: req.params.toEmail,
    subject: 'Register form',
    body: 'Name: ' + req.params.name + '<br>' +
          'Phone: ' + req.params.phone + '<br>' +
          'Email: ' + req.params.fromEmail + '<br>' +
          'Ticket: ' + req.params.ticket,
    contentType: 'text/html; charset="UTF-8"'
  });

  if (flag1) { log.info('contact.js Success! mail was sent...');}
  else { log.info('contact.js Failure! mail was not sent...'); }

  return true;
};

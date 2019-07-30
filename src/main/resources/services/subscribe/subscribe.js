const libMail = require('/lib/xp/mail');

exports.post = function(req) { // /_/service/app.event.theme/contact
  log.info('subscribe.js JSON %s', JSON.stringify(req.params), null, 4); /* TODO: remove this */

  var flag1 = libMail.send({
    from: req.params.fromEmail,
    to: req.params.toEmail,
    subject: 'Subscribe form',
    body: 'Email: ' + req.params.fromEmail,
    contentType: 'text/html; charset="UTF-8"'
  });

  if (flag1) { log.info('contact.js Success! mail was sent...');}
  else { log.info('contact.js Failure! mail was not sent...'); }

  return true;
};

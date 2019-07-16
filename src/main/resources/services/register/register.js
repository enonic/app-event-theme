/* var httpClientLib = require('/lib/http-client'); */

exports.post = function(req) {
  /* var response = httpClient.request({
    data: req.params
  }); */
    log.info('register.js JSON %s', JSON.stringify(req), null, 4); /* TODO: remove this */
    return true;
};

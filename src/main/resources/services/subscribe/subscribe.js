/* var httpClientLib = require('/lib/http-client'); */

exports.post = function(req) {
  /* var response = httpClient.request({
    data: req.params
  }); */
    log.info('subscribe.js JSON %s', JSON.stringify(req), null, 4); /* TODO: remove this */
    return true;
};

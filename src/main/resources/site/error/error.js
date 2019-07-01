var libThymeleaf = require('/lib/thymeleaf');
var libPortal = require('/lib/xp/portal');

var view404 = resolve('page-not-found.html');
var viewGeneric = resolve('error.html');

function getHomeUrl() {
    let siteId = libPortal.getSite()._id;
    let siteUrl = libPortal.pageUrl({
        id: siteId
    });
    return siteUrl;
}

function getSiteConfig() {    
    /* log.info('error.js JSON %s', JSON.stringify(libPortal.getSite().data.siteConfig.config, null, 4)); */
    return libPortal.getSite().data.siteConfig.config
}

exports.handle404 = function (err) {
    log.info('error.js %s', err.request.url + ", status: " + err.status + ", " + err.message);
    var params = {
        home: getHomeUrl(),
        config: getSiteConfig()
    };
    var body = libThymeleaf.render(view404, params);
    return {
        contentType: 'text/html',
        body: body
    }
};

exports.handleError = function (err) {
    log.info('error.js %s', err.request.url + ", status: " + err.status + ", " + err.message);
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }    
    var params = {
        errorCode: err.status,
        home: getHomeUrl(),
        config: getSiteConfig()
    };
    var body = libThymeleaf.render(viewGeneric, params);

    return {
        contentType: 'text/html',
        body: body
    }
};

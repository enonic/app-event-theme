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
    let site = libPortal.getSite();
    let properName = app.name.replace(/\./g, '-');
    /* log.info('error.js JSON %s', JSON.stringify(libPortal.getSite().data.siteConfig.config, null, 4)); */   
    return site.x[properName].siteConfig;
}

function getHeaderMetadata() {
    return {
        bootstrap: libPortal.assetUrl({ path: 'plugins/bootstrap/css/bootstrap.min.css' }),
        themefisherFont: libPortal.assetUrl({ path: 'plugins/themefisher-font/style.css' }),
        fontAwesome: libPortal.assetUrl({ path: 'plugins/font-awsome/css/font-awesome.min.css' }),
        magnificPopup: libPortal.assetUrl({ path: 'plugins/magnific-popup/magnific-popup.css' }),
        slickCarousel: libPortal.assetUrl({ path: 'plugins/slick/slick.css' }),
        slickCarouselTheme: libPortal.assetUrl({ path: 'plugins/slick/slick-theme.css' }),
        customCSS: libPortal.assetUrl({ path: 'styles/bundle.css' }),
        favicon: libPortal.imageUrl({ id: getSiteConfig().favicon, scale: 'block(80, 80)'}),
    }
}

exports.handle404 = function (err) {
    /* log.info('error.js %s', err.request.url + ", status: " + err.status + ", " + err.message); */
    var params = {
        home: getHomeUrl(),
        config: getSiteConfig(),
        image404: libPortal.assetUrl({ path: 'images/404.png' }),
        headerMetadata: getHeaderMetadata(),
    };
    var body = libThymeleaf.render(view404, params);
    return {
        contentType: 'text/html',
        body: body
    }
};

exports.handleError = function (err) {
    /* log.info('error.js %s', err.request.url + ", status: " + err.status + ", " + err.message); */
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }    
    var params = {
        errorCode: err.status,
        home: getHomeUrl(),
        config: getSiteConfig(),
        imageError: libPortal.assetUrl({ path: 'images/error.png' }),
        headerMetadata: getHeaderMetadata(),
    };
    var body = libThymeleaf.render(viewGeneric, params);

    return {
        contentType: 'text/html',
        body: body
    }
};

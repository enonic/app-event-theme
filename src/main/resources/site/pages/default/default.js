var libPortal = require('/lib/xp/portal'); // Import the portal functions
var libThymeleaf = require('/lib/thymeleaf'); // Import the Thymeleaf rendering function
var libMenu = require('/lib/menu.js');

var viewFile = resolve('default.html');

// Handle the GET request
exports.get = function(req) {

    // Get the content that is using the page
    var content = libPortal.getContent();
    var site = libPortal.getSite();
    var config = libPortal.getSiteConfig();

    
    // Fragment handling (single fragments should use this page controller automatically to render itself)
    var colorize = config.colorize ? "colorize" : "";
    var siteName = site.displayName;
    var isFragment = content.type === 'portal:fragment';
    var mainRegion = isFragment ? null : content.page.regions.main;
    
    var licence = config.licence || '<p><a>Eventre</a> © 2017 All Right Reserved</p>';

    var headerLogo = config.headerLogo;
    var footerLogo = config.footerLogo;

    var facebookUrl = config.facebookUrl;
    var twitterUrl = config.twitterUrl;
    var instagramUrl = config.instagramUrl;
    var rssUrl = config.rssUrl;
    var vimeoUrl = config.vimeoUrl;

    var ticketUrl = config.ticketUrl;
    var ticketText = config.ticketText || 'BUY TICKET';

    var breadcrumbItems = libMenu.getBreadcrumbMenu({}); // Get a breadcrumb menu for current content.
    var breadcrumbsBackground = config.breadcrumbsBackground;
    var breadcrumbsShowBanner = config.breadcrumbsShowBanner;

    /* log.info('default.js JSON %s', JSON.stringify(breadcrumbItems, null, 4)); */

	// Prepare the model that will be passed to the view
    var model = {
        siteName: siteName,
        colorize: colorize,
        isFragment: isFragment,
        mainRegion: mainRegion,
        licence: licence,
        headerLogo: headerLogo,
        footerLogo: footerLogo,
        facebookUrl: facebookUrl,
        twitterUrl: twitterUrl,
        instagramUrl: instagramUrl,
        rssUrl: rssUrl,
        vimeoUrl: vimeoUrl,
        ticketUrl: ticketUrl,
        ticketText: ticketText,
        breadcrumbs: breadcrumbItems,
        breadcrumbsBackground: breadcrumbsBackground,
        breadcrumbsShowBanner: breadcrumbsShowBanner
    };


    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model) // Render the dynamic HTML with values from the model
    };
};

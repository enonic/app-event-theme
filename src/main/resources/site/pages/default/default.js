var libPortal = require('/lib/xp/portal'); // Import the portal functions
var libThymeleaf = require('/lib/thymeleaf'); // Import the Thymeleaf rendering function

var libMenu = require('/lib/menu.js');
var libUtil = require('/lib/util')

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

    var socialProfilesUrls = []
    socialProfilesUrls = libUtil.data.forceArray(socialProfilesUrls);
    socialProfilesUrls = libUtil.data.trimArray(socialProfilesUrls);

    log.info('default.js JSON %s', JSON.stringify(config.socialProfiles, null, 4));
    log.info('default.js JSON %s', JSON.stringify(config.socialProfiles._selected.length, null, 4));

    for (var key in config.socialProfiles) {
        for (var i = 0; i < config.socialProfiles._selected.length; i++) {
            if (key === config.socialProfiles._selected[i]) {
                socialProfilesUrls.push({
                    'name': key.toLowerCase(),
                    'url': config.socialProfiles[key]
                });
                break;
            }
        }
    }

    var ticketUrl = config.ticketUrl;
    var ticketText = config.ticketText || 'BUY TICKET';

    var breadcrumbItems = libMenu.getBreadcrumbMenu({}); // Get a breadcrumb menu for current content.
    var breadcrumbsBackground = config.breadcrumbsBackground;
    var breadcrumbsShowBanner = config.breadcrumbsShowBanner;

	// Prepare the model that will be passed to the view
    var model = {
        siteName: siteName,
        colorize: colorize,
        isFragment: isFragment,
        mainRegion: mainRegion,
        licence: licence,
        headerLogo: headerLogo,
        footerLogo: footerLogo,
        ticketUrl: ticketUrl,
        ticketText: ticketText,
        breadcrumbs: breadcrumbItems,
        breadcrumbsBackground: breadcrumbsBackground,
        breadcrumbsShowBanner: breadcrumbsShowBanner,
        socialProfilesUrls: socialProfilesUrls
    };


    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model) // Render the dynamic HTML with values from the model
    };
};

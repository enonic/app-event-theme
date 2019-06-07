var libPortal = require('/lib/xp/portal'); // Import the portal functions
var libThymeleaf = require('/lib/thymeleaf'); // Import the Thymeleaf rendering function
var libMenu = require('/lib/menu.js');
var libContent = require('/lib/xp/content');

var viewFile = resolve('default.html');

// Handle the GET request
exports.get = function(req) {

    // Get the content that is using the page
    var content = libPortal.getContent();
    var site = libPortal.getSite();
    var config = libPortal.getSiteConfig();
    
    // Fragment handling (single fragments should use this page controller automatically to render itself)
    var isFragment = content.type === 'portal:fragment';
    var mainRegion = isFragment ? null : content.page.regions.main;    
    var licence = config.licence || '<p>Copyright &#169; Enonic AS. All Rights Reserved. <a href="https://enonic.com/privacy-policy">Privacy Policy</a>. <a href="https://enonic.com/cookie-policy">Cookie Policy</a>. </p>';
    var ticketText = config.ticketText || 'BUY TICKET';

    // Get a breadcrumb menu for current content.
    var breadcrumbItems = libMenu.getBreadcrumbMenu({
        params: {
            showHomepage: true
        }
    });
    
    var breadcrumbsHideBanner = false;
    if (config.breadcrumbsHideBanner) {
        breadcrumbsHideBanner = true;
    }
    
    
    var templateName = '';
    if (content.page.template) { templateName = libContent.get({ key: content.page.template }).displayName; }
    else { breadcrumbItems = false; }

    /* log.info('default.js JSON %s', JSON.stringify(breadcrumbsHideBanner), null, 4); */
    
	// Prepare the model that will be passed to the view
    var model = {
        siteName: site.displayName,
        isFragment: isFragment,
        mainRegion: mainRegion,
        licence: licence,
        headerLogo: config.headerLogo,
        footerLogo: config.footerLogo,
        facebookUrl: config.facebookUrl,
        twitterUrl: config.twitterUrl,
        instagramUrl: config.instagramUrl,
        rssUrl: config.rssUrl,
        vimeoUrl: config.ticketUrl,
        ticketUrl: config.ticketUrl,
        ticketText: ticketText,
        breadcrumbs: breadcrumbItems,
        breadcrumbsBackground: config.breadcrumbsBackground,
        breadcrumbsHideBanner: breadcrumbsHideBanner,
        templateName: templateName,
        homeUrl: libPortal.url({path: site._path}),
    };

    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model) // Render the dynamic HTML with values from the model
    };
};

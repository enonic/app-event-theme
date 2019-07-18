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

    let menuItems = libMenu.getMenuTree(2); // Get 2 levels of menu based on content setting 'Show in menu'.
    menuItems.forEach(element => {
        element.url = libPortal.pageUrl({ id: element.id });

        if (element.hasChildren) {
            element.children.forEach(subElement => {
                subElement.url = libPortal.pageUrl({ id: subElement.id});
            });
        }
    });
    
    var properName = app.name.replace(/\./g, '-');
    
    var siteConfig = site.x[properName].siteConfig;
    log.info('default.js JSON %s', JSON.stringify(templateName, null, 4));

	// Prepare the model that will be passed to the view
    var model = {
        siteName: site.displayName,
        isFragment: isFragment,
        mainRegion: mainRegion,
        settings: {
            licence: siteConfig.licence,
            headerLogo: siteConfig.headerLogo,
            footerLogo: siteConfig.footerLogo,
            facebookUrl: siteConfig.facebookUrl,
            twitterUrl: siteConfig.twitterUrl,
            instagramUrl: siteConfig.instagramUrl,
            rssUrl: siteConfig.rssUrl,
            vimeoUrl: siteConfig.ticketUrl,
            ticketUrl: siteConfig.ticketUrl,
            ticketText: siteConfig.ticketText,
            breadcrumb: {
                items:  breadcrumbItems,
                background: siteConfig.breadcrumbsBackground,
                hideBanner: siteConfig.breadcrumbsHideBanner,
            },
        },
        templateName: templateName,
        homeUrl: libPortal.url({path: site._path}),
        menuItems: menuItems,
        homeUrl: libPortal.pageUrl({ id: libPortal.getSite()._id }),
    };

    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model) // Render the dynamic HTML with values from the model
    };
};

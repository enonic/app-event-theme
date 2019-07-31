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

    let menuItems = libMenu.getMenuTree(2); // Get 2 levels of menu based on content setting 'Show in menu'.
    menuItems.forEach(element => {
        element.url = libPortal.pageUrl({ id: element.id });
        if (element.hasChildren) {
            element.children.forEach(subElement => {
                subElement.url = libPortal.pageUrl({ id: subElement.id});
            });
        }
    });

    let templateName = '';
    let pageTemplate = content.page.template; // TODO: crashes if no template
    let libContentDisplayName = libContent.get({ key: content._id }).displayName;
    if (pageTemplate) { templateName = libContent.get({ key: pageTemplate }).displayName; }
    else if (libContentDisplayName && libContentDisplayName != site.displayName) { templateName = libContentDisplayName; }
    else { breadcrumbItems = false; }
    
    var properName = app.name.replace(/\./g, '-');
    var siteConfig = site.x[properName].siteConfig;   

    /* log.info('default.js JSON %s', JSON.stringify(siteConfig.isNewsletter, null, 4)); */

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
            fromDate: siteConfig.fromDate,
            toDate: siteConfig.toDate,
            city: siteConfig.city,
            newsletter: {
                isNewsletter: siteConfig.isNewsletter,
                description: siteConfig.newsLetterDescription,
                url: siteConfig.newsLetterUrl,
                image: siteConfig.newsletterBackgroundImage
            },
            breadcrumb: {
                items: breadcrumbItems,
                background: siteConfig.breadcrumbsBackground,
                hideBanner: siteConfig.breadcrumbsHideBanner,
            },
            googleMaps: {
                isGoogleMaps: siteConfig.isGoogleMaps,
                apiKey: siteConfig.googleApi,
                address: siteConfig.address,
                phone: siteConfig.phone,
                email: siteConfig.email,
            },
        },
        templateName: templateName,
        homeUrl: libPortal.url({path: site._path}),
        menuItems: menuItems,
        homeUrl: libPortal.pageUrl({ id: libPortal.getSite()._id }),
    };

	var scriptUrl = libPortal.assetUrl({
		path: '/js/bundle.js'
	});

    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model), // Render the dynamic HTML with values from the model
		pageContributions: {
		  headEnd: [
			`<script src='${scriptUrl}'></script>`
		  ]
		}
    };
};

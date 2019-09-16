var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libMenu = require('/lib/menu.js');

var viewFile = resolve('default.html');

// Handle the GET request
exports.get = function(req) {

    // Get the content that is using the page
    let content = libPortal.getContent();
    let site = libPortal.getSite();
    // let config = libPortal.getSiteConfig();
    
    // Fragment handling (single fragments should use this page controller automatically to render itself)
    let isFragment = content.type === 'portal:fragment';
    let mainRegion = isFragment ? null : content.page.regions.main;

    // Site
    let properName = app.name.replace(/\./g, '-');
    let siteConfig = site.x[properName].siteConfig;   

    // Get a breadcrumb menu for current content.
    let breadcrumbItems = libMenu.getBreadcrumbMenu({ params: { showHomepage: true } });

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
    try {        
        let pageTemplate = content.page.template; // crashes if no template

        let menuContent = libContent.get({ key: content._id });
        let displayName = menuContent.displayName;
        let menuName = menuContent.x[properName]['menu-item'].menuName;
        if (menuName) { templateName = menuName; }
        else if (pageTemplate) { templateName = libContent.get({ key: pageTemplate }).displayName; }
        else if (displayName && displayName != site.displayName) { templateName = displayName; }
        else { breadcrumbItems = false; }
    } catch(err) {}    

    log.info('default.js JSON %s', JSON.stringify(menuItems, null, 4));

	// Prepare the model that will be passed to the view
    let model = {
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
                apiKey: siteConfig.googleApi,
                latitude: siteConfig.latitude,
                longitude: siteConfig.longitude,
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

	let scriptUrl = libPortal.assetUrl({ path: '/js/bundle.js' });

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

var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libMenu = require('/lib/menu.js');

var viewFile = resolve('default.html');

// Handle the GET request
exports.get = function (req) {

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
    let headerConfig = site.x[properName].header;
    let footerConfig = site.x[properName].footer;

    // Get a breadcrumb menu for current content.
    let breadcrumbItems = libMenu.getBreadcrumbMenu({ params: { showHomepage: true } });

    let menuItems = libMenu.getMenuTree(2); // Get 2 levels of menu based on content setting 'Show in menu'.
    menuItems.forEach(element => {
        element.url = libPortal.pageUrl({ id: element.id });
        if (element.hasChildren) {
            element.children.forEach(subElement => {
                subElement.url = libPortal.pageUrl({ id: subElement.id });
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
    } catch (err) { }

    /* log.info('default.js JSON %s', JSON.stringify(menuItems, null, 4)); */

    // Prepare the model that will be passed to the view
    let model = {
        siteName: site.displayName,
        isFragment: isFragment,
        mainRegion: mainRegion,
        settings: {
            siteConfig: {
                fromDate: siteConfig.fromDate,
                toDate: siteConfig.toDate,
                city: siteConfig.city,
            },
            headerConfig: {
                headerLogo: headerConfig.headerLogo,
                ticketUrl: headerConfig.ticketUrl,
                ticketText: headerConfig.ticketText,
                breadcrumb: {
                    items: breadcrumbItems,
                    background: headerConfig.breadcrumbsBackground,
                    hideBanner: headerConfig.breadcrumbsHideBanner,
                },
            },
            footerConfig: {
                licence: footerConfig.licence,
                footerLogo: footerConfig.footerLogo,
                facebookUrl: footerConfig.facebookUrl,
                twitterUrl: footerConfig.twitterUrl,
                instagramUrl: footerConfig.instagramUrl,
                rssUrl: footerConfig.rssUrl,
                vimeoUrl: footerConfig.ticketUrl,
                newsletter: {
                    isNewsletter: footerConfig.isNewsletter,
                    description: footerConfig.newsLetterDescription,
                    url: footerConfig.newsLetterUrl,
                    image: footerConfig.newsletterBackgroundImage
                },
                googleMaps: {
                    apiKey: footerConfig.googleApi,
                    latitude: footerConfig.latitude,
                    longitude: footerConfig.longitude,
                    address: footerConfig.address,
                    phone: footerConfig.phone,
                    email: footerConfig.email,
                },
            }
        },
        /* settings: {
            licence: footerConfig.licence,
            headerLogo: headerConfig.headerLogo,
            footerLogo: footerConfig.footerLogo,
            facebookUrl: footerConfig.facebookUrl,
            twitterUrl: footerConfig.twitterUrl,
            instagramUrl: footerConfig.instagramUrl,
            rssUrl: footerConfig.rssUrl,
            vimeoUrl: footerConfig.ticketUrl,
            ticketUrl: headerConfig.ticketUrl,
            ticketText: headerConfig.ticketText,
            fromDate: siteConfig.fromDate,
            toDate: siteConfig.toDate,
            city: siteConfig.city,
            newsletter: {
                isNewsletter: footerConfig.isNewsletter,
                description: footerConfig.newsLetterDescription,
                url: footerConfig.newsLetterUrl,
                image: footerConfig.newsletterBackgroundImage
            },
            breadcrumb: {
                items: breadcrumbItems,
                background: headerConfig.breadcrumbsBackground,
                hideBanner: headerConfig.breadcrumbsHideBanner,
            },
            googleMaps: {
                apiKey: footerConfig.googleApi,
                latitude: footerConfig.latitude,
                longitude: footerConfig.longitude,
                address: footerConfig.address,
                phone: footerConfig.phone,
                email: footerConfig.email,
            },
        }, */
        templateName: templateName,
        homeUrl: libPortal.url({ path: site._path }),
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

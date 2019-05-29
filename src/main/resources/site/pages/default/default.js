var libPortal = require('/lib/xp/portal'); // Import the portal functions
var libThymeleaf = require('/lib/thymeleaf'); // Import the Thymeleaf rendering function

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
    
    /* log.info('default.js JSON %s', JSON.stringify(imageUrl, null, 4)); */

	// Prepare the model that will be passed to the view
    var model = {
		  siteName: siteName,
          colorize: colorize,
		  isFragment: isFragment,
          mainRegion: mainRegion,
    };


    // Return a response from the server to the client
    return {
        body: libThymeleaf.render(viewFile, model) // Render the dynamic HTML with values from the model
    };
};

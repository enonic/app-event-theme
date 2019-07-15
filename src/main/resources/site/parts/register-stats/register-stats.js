var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('register-stats.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;
	
	/* ### Manipulate ### */	
    /* log.info('register-stats.js JSON %s', JSON.stringify(config.backgroundImage, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        speakers: config.speakers,
        seats: config.seats,
        tickets: config.tickets,
        days: config.days,
        backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

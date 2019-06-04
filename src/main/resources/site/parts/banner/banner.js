var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('banner.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

	/* ### Manipulate ### */
    var haveCountDown = config.haveCountDown;
    var title = config.title;
    var date = config.date;
    var location = config.location;
    var ticketUrl = config.ticketUrl;
    var backgroundImage = config.backgroundImage;	

    /* log.info('banner.js JSON %s', JSON.stringify(config, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		haveCountDown: haveCountDown,
		title: title,
		date: date,
		location: location,
		ticketUrl: ticketUrl,
		backgroundImage: backgroundImage
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};

};

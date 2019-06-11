var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');

var viewFile = resolve('1-col.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    /* log.info('speakers.js JSON %s', JSON.stringify(speakersDetails, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

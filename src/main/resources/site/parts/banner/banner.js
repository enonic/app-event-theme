var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('banner.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.

	/* ### Manipulate ### */
	
	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		someText: component.config["someText"]
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};

};

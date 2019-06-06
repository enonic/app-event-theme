var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('speaker.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    
	/* ### Manipulate ### */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        speaker: content
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

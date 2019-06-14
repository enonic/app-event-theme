var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('categories.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;	
    
	/* ### Manipulate ### */

    if (config.categories !== null && config.categories !== undefined) {
        config.categories = libUtil.data.forceArray(config.categories)
    }

    /* log.info('categories.js JSON %s', JSON.stringify(config.categories, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        categories: config.categories
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

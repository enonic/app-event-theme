var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('1-col.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

	/* ### Manipulate ### */
	var regions = [];
	var componentRegions = component.regions;
	for (var key in componentRegions) {
		if (componentRegions.hasOwnProperty(key)) {
			var region = componentRegions[key];
			region.name = key;
			regions.push(region);
		}
	}

    /* log.info('1-col.js JSON %s', JSON.stringify(config.backgroundImage, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
		regions: regions,
        component: component,
		backgroundImage: config.backgroundImage? libPortal.imageUrl({ id: config.backgroundImage, scale: 'max(1280)'}) : null,
		fixedBackground: config.fixedBackground,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

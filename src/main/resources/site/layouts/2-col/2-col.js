var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('2-col.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    var columnConfig = config.columnConfig.split("-");
    var leftConfig = "layout-2-col-" + columnConfig[0];
    var rightConfig = "layout-2-col-" + columnConfig[1];

    /* log.info('speakers.js JSON %s', JSON.stringify(columnConfig, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
		leftRegion: component.regions["left"],
        rightRegion: component.regions["right"],
        leftConfig: leftConfig,
        rightConfig: rightConfig,
        backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('search.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    let siteUrl = libPortal.pageUrl({
        id: libPortal.getSite()._id
	});
	
	/* log.info('search.js JSON %s', JSON.stringify(config.width || false, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		siteUrl: siteUrl,
		width: config.width || false
	};

	var scriptUrl = libPortal.assetUrl({
		path: '/js/bundle.js'
	});

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model),
		pageContributions: {
		  headEnd: [
			`<script src='${scriptUrl}'></script>`
		  ]
		}
	};
};

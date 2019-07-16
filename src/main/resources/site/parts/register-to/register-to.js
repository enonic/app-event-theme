var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('register-to.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;
	
	/* ### Manipulate ### */
	let ticketTypes = [];
	if (config.ticketTypes === null || config.ticketTypes === undefined)
		ticketTypes = [{ticketType: 'Standard'}]
	else
		ticketTypes = libUtil.data.forceArray(config.ticketTypes)

	/* log.info('register-to.js JSON %s', JSON.stringify(ticketTypes), null, 4); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        heading: config.heading,
        description: config.description,
		url: config.url,
		ticketTypes: ticketTypes,
        backgroundImage: config.backgroundImage,
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

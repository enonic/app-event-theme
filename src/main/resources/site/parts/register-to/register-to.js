var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('register-to.html');

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
	let config = component.config;
	let site = libPortal.getSite();

	/* ### Manipulate ### */
	let ticketTypes = [];
	if (config.ticketTypes === null || config.ticketTypes === undefined)
		ticketTypes = [{ ticketType: 'Standard' }]
	else
		ticketTypes = libUtil.data.forceArray(config.ticketTypes)

	/* log.info('register-to.js JSON %s', JSON.stringify(ticketTypes), null, 4); */

	/* ### Prepare ### */
	let model = {
		content: content,
		component: component,
		heading: site.displayName,
		description: config.description,
		url: config.url,
		ticketTypes: ticketTypes,
		backgroundImage: libPortal.imageUrl({ id: config.backgroundImage, scale: 'max(1280)' }),
	};

	let scriptUrl = libPortal.assetUrl({
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

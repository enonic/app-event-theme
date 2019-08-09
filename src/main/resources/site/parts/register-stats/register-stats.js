var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('register-stats.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
	let config = component.config;

	let site = libPortal.getSite();
	let properName = app.name.replace(/\./g, '-');
	let siteConfig = site.x[properName].siteConfig;

	/* ### Manipulate ### */

	// get number of speakers
	let result = libContent.query({ contentTypes: [app.name + ":speaker"] });
	let speakers = result.total;

	// get number of days
	let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	let firstDate = new Date(siteConfig.fromDate);
	let secondDate = new Date(siteConfig.toDate);
	let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1 | 0;

	/* log.info('register-stats.js JSON %s', JSON.stringify(result, null, 4)); */

	/* ### Prepare ### */
	let model = {
		content: content,
		component: component,
		speakers: speakers,
		seats: config.seats,
		tickets: config.tickets,
		days: diffDays,
		backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

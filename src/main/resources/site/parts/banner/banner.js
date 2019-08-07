var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('banner.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
	let site = libPortal.getSite();
	let config = component.config;

	let properName = app.name.replace(/\./g, '-');
	let siteConfig = site.x[properName].siteConfig;

	/* ### Manipulate ### */
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let dateLabel = "";

	let fromDate = new Date(siteConfig.fromDate);
	let toDate = new Date(siteConfig.toDate);

	dateLabel += fromDate.getDate();
	if (fromDate.getFullYear() === toDate.getFullYear()) {
		if (months[fromDate.getMonth()] === months[toDate.getMonth()]) {
			dateLabel += "-" + toDate.getDate() + " " + months[fromDate.getMonth()] + " " + fromDate.getFullYear();
		} else {
			dateLabel += " " + months[fromDate.getMonth()] + " - " + toDate.getDate() + " " + months[toDate.getMonth()] + " " + fromDate.getFullYear();
		}
	} else {
		dateLabel += " " + months[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + toDate.getDate() + " " + months[toDate.getMonth()] + " " + toDate.getFullYear();
	}

	/* log.info('banner.js JSON %s', JSON.stringify(fromDate, null, 4)); */

	/* ### Prepare ### */
	let model = {
		content: content,
		component: component,
		haveCountDown: config.haveCountDown,
		title: "<h1>" + site.displayName + "</h1>",
		dateLabel: dateLabel,
		dateFrom: months[fromDate.getMonth()].substring(0, 3) + " " + fromDate.getDate() + ", " + fromDate.getFullYear(),
		location: siteConfig.city,
		ticketUrl: siteConfig.ticketUrl,
		backgroundImage: config.backgroundImage,
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

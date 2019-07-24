var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('banner.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var site = libPortal.getSite();
    var config = component.config;
	
    var properName = app.name.replace(/\./g, '-');
    var siteConfig = site.x[properName].siteConfig; 
	
	/* ### Manipulate ### */
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dateLabel = "";
	
	if (config.fromDate && config.toDate) {
		var fromDate = new Date(siteConfig.fromDate);
		var toDate = new Date(siteConfig.toDate);

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
	}
	
    /* log.info('banner.js JSON %s', JSON.stringify(siteConfig, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		haveCountDown: config.haveCountDown,
		title: "<h1>" + site.displayName + "</h1>",
		dateLabel: dateLabel,
		location: siteConfig.city,
		ticketUrl: siteConfig.ticketUrl,
		backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

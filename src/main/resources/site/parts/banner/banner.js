var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('banner.html'); // TODO: This is not the view-file you're looking for ... or is it?

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

	
	/* ### Manipulate ### */
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dateLabel = "";
	
	if (config.fromDate && config.toDate) {
		var fromDate = new Date(config.fromDate);
		var toDate = new Date(config.toDate);

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
	
    /* log.info('banner.js JSON %s', JSON.stringify(fulldate, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		haveCountDown: config.haveCountDown,
		title: config.title,
		dateLabel: dateLabel,
		location: config.location,
		ticketUrl: config.ticketUrl,
		backgroundImage: config.backgroundImage,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

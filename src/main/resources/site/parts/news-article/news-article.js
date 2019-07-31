var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');
var libAuth = require('/lib/xp/auth');

var viewFile = resolve('news-article.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    
	/* ### Manipulate ### */
    content.data.tag = libUtil.data.forceArray(content.data.tag);

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let published = {};
	let date = new Date(content.createdTime.split('T')[0]);

	if (content.createdTime) {
        published.day = date.getDate() | 0;
        published.month = months[date.getMonth()]
        published.year = date.getFullYear() | 0;
	}

	content.owner = libAuth.getPrincipal(content.owner).displayName;

    /* log.info('news-article.js JSON %s', JSON.stringify(content.createdTime, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        newsArticle: content,
        published: published
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');
var libAuth = require('/lib/xp/auth');
var libContent = require('/lib/xp/content');

var viewFile = resolve('news-article.html');

var searchResultsPageExists = false;

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    
    if (searchResultsPageExists == false) {
        var site = libPortal.getSite();
        var searchUrl = libContent.get({
            key: site._path + "/search-results",
        });
        if (searchUrl != null) {
            searchResultsPageExists = !searchResultsPageExists;
        }
	}
	
	/* ### Manipulate ### */	
    let siteUrl = libPortal.pageUrl({
        id: libPortal.getSite()._id
	});

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
	let model = {
		content: content,
        component: component,
        newsArticle: content,
		published: published,
		siteUrl: siteUrl,
		searchResultsPageExists: searchResultsPageExists,
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

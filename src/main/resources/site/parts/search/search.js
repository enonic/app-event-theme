var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');

var viewFile = resolve('search.html');

var searchResultsPageExists = false;

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;
	
	let placeholder = "Search...";
	if (searchResultsPageExists == false) {
        var site = libPortal.getSite();
        var searchUrl = libContent.get({
            key: site._path + "/search-results",
        });
        if (searchUrl != null) {
			searchResultsPageExists = !searchResultsPageExists;
        } else {
			placeholder = "Error: found no part 'search-results!";
		}
	}
	
	log.info('');
	log.info('');
	log.info('search.js result %s', JSON.stringify(searchResultsPageExists, null, 4));
	log.info('');
	log.info('');

    let siteUrl = libPortal.pageUrl({
        id: libPortal.getSite()._id
	});
	
	let searchWord = '';
	let queryString = 'search=';
	if (req.url.search(queryString) !== -1) {
		searchWord = decodeURI(req.url.substring(req.url.search(queryString) + queryString.length, req.url.length)); // offsetting by queryString.length
	}

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		siteUrl: siteUrl,
		width: config.width || false,
		searchWord: searchWord,
		placeholder: placeholder,
		searchResultsPageExists: searchResultsPageExists,
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

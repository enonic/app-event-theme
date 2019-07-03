var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('search-results.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    /* var config = component.config; */
	
	/* ### Manipulate ### */
	let searchWord = decodeURI(req.url.substring(req.url.search('=') + 1, req.url.length));
	/* log.info('search-results.js JSON %s', JSON.stringify(searchWord, null, 4)); */
	
	var result = libContent.query({ // query bruker 'string literals'
		start: 0,
		count: 10,
		query: `displayName = '${searchWord}' OR 
				displayName LIKE '*${searchWord}*' OR
				fulltext('data.personalInformation, data.description', "${searchWord}", 'OR')
		`,		
		contentTypes: [
			app.name + ':news-article',
			app.name + ':speaker',
		]		
	});
	/* log.info('search.js JSON %s', JSON.stringify(result, null, 4)); */
	
	libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
		element.url = libPortal.pageUrl({ id: element._id })
	});	

    let siteId = libPortal.getSite()._id;
    let siteUrl = libPortal.pageUrl({
        id: siteId
    });

	/* ### Prepare ### */
	var model = {
		content: content,
		component: component,
		searchWord: searchWord,
		results: result.hits,
		resultLength: result.hits.length,
		home: siteUrl,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

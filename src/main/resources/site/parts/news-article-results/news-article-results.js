var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('news-article-results.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    /* var config = component.config; */
	
	/* ### Manipulate ### */
	let searchWord = decodeURI(req.url.substring(req.url.search('=') + 1, req.url.length));
	/* log.info('search-results.js JSON %s', JSON.stringify(searchWord, null, 4)); */
	
	let result = {hits: []};
	if (searchWord !== '') {
		result = libContent.query({ // query bruker 'string literals'
			query: `data.tag = '${searchWord}'`,		
			contentTypes: [ app.name + ':news-article' ]		
		});		
		/* fulltext('data.personalInformation, data.description', "${searchWord}", 'OR') */
		/* log.info('search.js JSON %s', JSON.stringify(result, null, 4)); */
		
		libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
			element.url = libPortal.pageUrl({ id: element._id })
		});
    }
    
    log.info('search.js JSON %s', JSON.stringify(result.hits, null, 4));

	let siteUrl = libPortal.pageUrl({
		id: libPortal.getSite()._id
	});

	/* ### Prepare ### */
	let model = {
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

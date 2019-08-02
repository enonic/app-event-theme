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
	let splittedAbsoluteURL = decodeURI(req.url).split('/');
	let dataUrl = splittedAbsoluteURL[splittedAbsoluteURL.length - 1];
	let searchBy = dataUrl.substring(dataUrl.search("\\?") + 1, dataUrl.search("=")); // 'category' or 'tag'
	let searchWord = dataUrl.substring(dataUrl.search("=") + 1, dataUrl.length);
	
	let result = {hits: []};
	if (searchWord !== '') {
		result = libContent.query({
			query: "data." + searchBy + " = '" + searchWord + "'",
			contentTypes: [ app.name + ':news-article' ]		
		});
		
		libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
			element.url = libPortal.pageUrl({ id: element._id })
		});
    }
    
    /* log.info('search.js JSON %s', JSON.stringify(result.hits, null, 4)); */

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

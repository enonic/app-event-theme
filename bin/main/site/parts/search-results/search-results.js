var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('search-results.html');

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
	/* var config = component.config; */
	let site = libPortal.getSite();

	let splittedAbsoluteURL = decodeURI(req.url).split('/');
	let dataUrl = splittedAbsoluteURL[splittedAbsoluteURL.length - 1];
	let searchBy = dataUrl.substring(dataUrl.search("\\?") + 1, dataUrl.search("=")); // 'category' or 'tag'
	let searchWord = dataUrl.substring(dataUrl.search("=") + 1, dataUrl.length);

	let result = { hits: [] };
	if (searchWord !== '') {
		if (searchBy === 'search') {
			result = libContent.query({
				start: 0,
				count: 10,
				query: `_path LIKE '/content${site._path}/*' AND
						(displayName = '${searchWord}^10' OR 				
						displayName LIKE '*${searchWord}*^5' OR					
						fulltext('_allText', "${searchWord}", 'OR'))
						`,
				contentTypes: [
					app.name + ':news-article',
					app.name + ':speaker',
				]
			});
		} else if (searchBy === 'tag') {
			result = libContent.query({
				start: 0,
				count: 10,
				query: `_path LIKE '/content${site._path}/*' AND
						data.${searchBy} = '${searchWord}'`,
				contentTypes: [app.name + ':news-article']
			});
		} else if (searchBy === 'category') {
			let categoryResult = libContent.query({
				query: `_path LIKE '/content${site._path}/*' AND
						displayName = '${searchWord}'`,
				contentTypes: [app.name + ':category']
			});
			result = libContent.query({
				start: 0,
				count: 10,
				query: `_path LIKE '/content${site._path}/*' AND
						data.category = '${categoryResult.hits[0]._id}'`,
				contentTypes: [app.name + ':news-article']
			});
		}
		libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
			element.url = libPortal.pageUrl({ id: element._id })
			element.data.description = libPortal.processHtml({ value: element.data.description  });
		});
	}

	/* log.info('search-results.js %s', JSON.stringify(site._path, null, 4)); */

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

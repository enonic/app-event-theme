var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
/* var libUtil = require('/lib/util'); */

var viewFile = resolve('categories.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    /* let config = component.config; */	
    
	/* ### Manipulate ### */

	let siteUrl = libPortal.pageUrl({
        id: libPortal.getSite()._id
	});

    // query all news-articles
    let result = libContent.query({ contentTypes: [ app.name + ":news-article" ] });
	/* log.info('categories.js result %s', JSON.stringify(result, null, 4)); */

    // extract categories from query
    let rawCategories = [];
    result.hits.forEach(element => {
        if (element.data.category !== null && element.data.category !== undefined)
            rawCategories.push(element.data.category);
    });

    // count occurences of categories
    let count = {};
    rawCategories.forEach(element => {
        count[element] = (count[element] || 0) + 1 | 0;
    });

    // sort occurences of categories
    let sortable = [];
    for (let categories in count) {
        sortable.push([categories, count[categories]]);
    }
    sortable.sort(function(a, b) { return b[1] - a[1]; });

	/* log.info('categories.js sortable %s', JSON.stringify(sortable, null, 4)); */

	/* ### Prepare ### */
	let model = {
		content: content,
        component: component,
        siteUrl: siteUrl,
        categories: sortable
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

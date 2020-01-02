var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('categories.html');
var searchResultsPageExists = false;

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    /* let config = component.config; */
    let site = libPortal.getSite();

    if (searchResultsPageExists == false) {
        var searchUrl = libContent.get({
            key: site._path + "/search-results",
        });
        if (searchUrl != null) {
            searchResultsPageExists = !searchResultsPageExists;
        }
    }

    /* ### Manipulate ### */
    let siteUrl = libPortal.pageUrl({ id: site._id });

    // query all news-articles
    let result = libContent.query({
        contentTypes: [app.name + ":news-article"],
        query: "_path LIKE '/content" + site._path + "/*'", // Only get tags from this site.
    });

    // extract categories from query
    let rawCategories = [];
    try {
        result.hits.forEach(element => {
            if (element.data.category !== null && element.data.category !== undefined) {
                element.data.category = libUtil.data.forceArray(element.data.category);
                element.data.category.forEach(category => {
                    rawCategories.push(libContent.get({ key: category }).displayName);
                });
            }
        });
    } catch(err) {log.info('categories.js ERROR %s', JSON.stringify(err, null, 4));}

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
    sortable.sort(function (a, b) { return b[1] - a[1]; });

    /* log.info('categories.js sortable %s', JSON.stringify(sortable, null, 4)); */

    /* ### Prepare ### */
    let model = {
        content: content,
        component: component,
        siteUrl: siteUrl,
        categories: sortable,
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

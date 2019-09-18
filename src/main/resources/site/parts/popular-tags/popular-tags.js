var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('popular-tags.html');

var searchResultsPageExists = false;

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    let config = component.config;
    let site = libPortal.getSite();

    /* ### Manipulate ### */

    if (searchResultsPageExists == false) {
        var searchUrl = libContent.get({
            key: site._path + "/search-results",
        });
        if (searchUrl != null) {
            searchResultsPageExists = !searchResultsPageExists;
        }
	}

    let siteUrl = libPortal.pageUrl({ id: site._id });

    // query all news-articles
    let result = libContent.query({ 
        contentTypes: [app.name + ":news-article"],
        query: "_path LIKE '/content" + site._path + "/*'", // Only get tags from this site.
    });

    // extract tags from query
    let rawTags = [];
    result.hits.forEach(element => {
        if (element.data.tag !== null && element.data.tag !== undefined) {
            element.data.tag = libUtil.data.forceArray(element.data.tag);
            element.data.tag.forEach(tag => {
                rawTags.push(tag.toLowerCase());
            })
        }
    });

    // count occurences of tags
    let count = {};
    rawTags.forEach(element => {
        count[element] = (count[element] || 0) + 1 | 0;
    });

    // sort occurences of tags
    let sortable = [];
    for (let tag in count) {
        sortable.push([tag, count[tag]]);
    }
    sortable.sort(function (a, b) { return a[1] - b[1]; });

    // get most popular tags by numTags
    let mostPopularTags = [];
    for (let i = 0; i < config.numTags; i++) {
        try {
            mostPopularTags.push(sortable.pop()[0]);
        } catch (err) { }
    }

    /* log.info('latest-post.js JSON %s', JSON.stringify(mostPopularTags, null, 4)); */

    /* ### Prepare ### */
    let model = {
        content: content,
        component: component,
        siteUrl: siteUrl,
        mostPopularTags: mostPopularTags,
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

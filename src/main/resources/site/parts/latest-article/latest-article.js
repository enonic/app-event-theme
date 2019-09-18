var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
/* var libUtil = require('/lib/util'); */

var viewFile = resolve('latest-article.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    let config = component.config;
    let site = libPortal.getSite();
    
    /* ### Manipulate ### */

    // Get all articles
    let result = libContent.query({
        start: 0,
        count: parseInt(config.numPosts, 10),
        query: "_path LIKE '/content" + site._path + "/*'", // Only get tags from this site.
        sort: "createdTime DESC",
        contentTypes: [ app.name + ":news-article" ]
    });

    // Parse article dates
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let articles = [];
    for (let i = 0; i < result.hits.length; i++) {
        let date = new Date(result.hits[i].createdTime.split('T')[0]);
        let dateLabel = " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();

        articles.push({
            name: result.hits[i].displayName,
            date: dateLabel,
            image: libPortal.imageUrl({ id: result.hits[i].data.image, scale: 'width(846)' }),
            url: libPortal.pageUrl({ id: result.hits[i]._id }),
        });
    }

    /* log.info('latest-post.js JSON %s', JSON.stringify(articles, null, 4)); */
    
	/* ### Prepare ### */
	let model = {
		content: content,
        component: component,
        articles: articles,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');
var libAuth = require('/lib/xp/auth');

var viewFile = resolve('news-article-list.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    var newsDetails = []
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (config.newsArticles !== null && config.newsArticles !== undefined) {
        libUtil.data.forceArray(config.newsArticles).forEach(element => { /* Retrieve all news articles with all of their details */
            var news = libContent.get({ key: element });

            var newsImage = libPortal.imageUrl({    /* We want the image */
                id: news.data.image,
                scale: 'block(350, 222)'
            });

            var date = new Date(news.createdTime.split('T')[0]);        
            var newsPublished = {
                day: date.getDate() | 0, // trick to force number to have no digits
                month: months[date.getMonth()],
                year: date.getFullYear() | 0    // trick to force number to have no digits
            };

            newsDetails.push({
                title: news.displayName,
                image: newsImage,
                published: newsPublished,
                author: libAuth.getPrincipal(news.owner).displayName,
                url: libPortal.pageUrl({ id: news._id })
            });
        });
    }
    
    log.info('news-articles-list.js JSON %s', JSON.stringify(newsDetails, null, 4));

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        newsList: newsDetails,
        description: config.description,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

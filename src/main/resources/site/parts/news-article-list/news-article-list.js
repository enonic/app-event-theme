var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');


var viewFile = resolve('news-article-list.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    var news = [];

    libUtil.data.forceArray(config.newsArticles).forEach(element => { /* Retrieve all news articles with all of their details */
        news.push(
            libContent.get({
                key: element
            })
        );
    });
    
    /* log.info('news-articles-list.js JSON %s', JSON.stringify(news, null, 4)); */

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
    var newsDetails = []
    news.forEach(element => {   /* Filter out the details we want from each news article */
        var image = libPortal.imageUrl({    /* We want the image */
            id: element.data.image,
            scale: 'block(350, 222)'
        });

        var published = {};
        var date = new Date(element.createdTime.split('T')[0]);

        if (element.createdTime) {
            published.day = date.getDay() | 0;
            published.month = months[date.getMonth()]
            published.year = date.getFullYear() | 0;
        }

        newsDetails.push({
            title: element.displayName, /* We want the title */
            image: image,
            published: published,
            author: element.owner
        });
    });

    /* log.info('news-articles-list.js JSON %s', JSON.stringify(newsDetails, null, 4)); */

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

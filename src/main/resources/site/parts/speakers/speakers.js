var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');

var viewFile = resolve('speakers.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    var speakers = [];

    config.speakers.forEach(element => { /* Retrieve all speakers with all of their details */
        speakers.push(
            libContent.get({
                key: element
            })
        );
    });

    var speakersDetails = []
    speakers.forEach(element => {   /* Filter out the details we want from each speaker */
        var image = libPortal.imageUrl({    /* We want their image */
            id: element.data.image,
            scale: 'square(240)'
        });

        speakersDetails.push({
            name: element.displayName,  /* We want their name */
            title: element.data.title,  /* We want their title */
            image: image,
            linkedinUrl: element.data.linkedinUrl,
            twitterUrl: element.data.twitterUrl,
            pintrestUrl: element.data.pintrestUrl,
            facebookUrl: element.data.facebookUrl,
        });
    });

    /* log.info('speakers.js JSON %s', JSON.stringify(speakersDetails, null, 4)); */

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        speakers: speakersDetails,
        backgroundImage: config.backgroundImage,
        description: config.description,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

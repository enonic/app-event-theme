var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('speaker.html');

exports.macro = function(context) {
    /* ### Manipulate ### */
    var speakersDetails = [];

    if (context.params.speakers !== null && context.params.speakers !== undefined) {
        libUtil.data.forceArray(context.params.speakers).forEach(element => { // Retrieve all speakers with all of their details            
            var speaker = libContent.get({ key: element });

            speakersDetails.push({
                name: speaker.displayName,
                title: speaker.data.title,
                image: libPortal.imageUrl({ id: speaker.data.image, scale: 'block(241, 254)' }), // hard coded image dimensions relative to template site
                url: libPortal.pageUrl({ id: speaker._id }),
                linkedinUrl: speaker.data.linkedinUrl,
                twitterUrl: speaker.data.twitterUrl,
                pintrestUrl: speaker.data.pintrestUrl,
                facebookUrl: speaker.data.facebookUrl,
            });
        });
    }

    /* log.info('speakers.js JSON %s', JSON.stringify(speakersDetails, null, 4)); */

	/* ### Prepare ### */
	var model = {
        speakers: speakersDetails,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

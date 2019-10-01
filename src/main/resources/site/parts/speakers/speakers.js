var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('speakers.html');

exports.get = function (req) {

    /* ### Collect ### */
    var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    var config = component.config;

    /* ### Manipulate ### */
    var speakersDetails = [];

    if (config.speakers !== null && config.speakers !== undefined) {
        libUtil.data.forceArray(config.speakers).forEach(element => { // Retrieve all speakers with all of their details            
            var speaker = libContent.get({ key: element });

            speakersDetails.push({
                name: speaker.displayName,
                title: speaker.data.title,
                image: libPortal.imageUrl({ id: speaker.data.image, scale: 'block(256, 320)' }), // hard coded image dimensions relative to template site (256, 270)
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
        content: content,
        component: component,
        speakers: speakersDetails,
        backgroundImage: config.backgroundImage,
        backgroundImage: libPortal.imageUrl({ id: config.backgroundImage, scale: 'max(1280)' }),
        description: config.description,
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
};

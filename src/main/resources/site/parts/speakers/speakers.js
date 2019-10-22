var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('speakers.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    let config = component.config;

    /* ### Manipulate ### */
    let speakersDetails = [];

    if (config.speakers !== null && config.speakers !== undefined) {
        libUtil.data.forceArray(config.speakers).forEach(element => { // Retrieve all speakers with all of their details            
            let speaker = libContent.get({ key: element });

            speakersDetails.push({
                name: speaker.displayName,
                title: speaker.data.title,
                image: speaker.data.image? libPortal.imageUrl({ id: speaker.data.image, scale: 'block(256, 320)' }) : null, // hard coded image dimensions relative to template site (256, 270)
                url: libPortal.pageUrl({ id: speaker._id }),
                linkedinUrl: speaker.data.linkedinUrl,
                twitterUrl: speaker.data.twitterUrl,
                pintrestUrl: speaker.data.pintrestUrl,
                facebookUrl: speaker.data.facebookUrl,
            });
        });
    }

    let exists = libContent.exists({key: config.backgroundImage});
    log.info('speakers.js JSON %s', JSON.stringify(exists, null, 4)
        );
    /* let backgroundImage = libPortal.imageUrl({ id: config.backgroundImage, scale: 'max(1280)' }); */
    /* log.info('speakers.js JSON true %s', JSON.stringify(libContent.exist(backgroundImage), null, 4)); */

    /* log.info('speakers.js JSON %s', JSON.stringify(config.backgroundImage, null, 4)); */

    /* ### Prepare ### */
    let model = {
        content: content,
        component: component,
        speakers: speakersDetails,
        backgroundImage: null,
        description: config.description,
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
};

var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('sponsors.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;

    /* ### Manipulate ### */
    let sponsors = [];
    if (config.sponsors !== null && config.sponsors !== undefined) {
        sponsors = libUtil.data.forceArray(config.sponsors);
        sponsors.forEach(element => {
            element.sponsors = libUtil.data.forceArray(element.sponsors);
            element.sponsors.forEach(sponsorElement => {
                sponsorElement.image = libPortal.imageUrl({
                    id: sponsorElement.image,
                    scale: 'block(140, 55)',
                });
            });
        });
    }

    /* log.info('sponsor.js JSON %s', JSON.stringify(sponsors, null, 4)); */

    /* ### Prepare ### */
    var model = {
        content: content,
        component: component,
        description: config.description,
        becomeSponsorUrl: config.becomeSponsorUrl,
        backgroundImage: config.backgroundImage? libPortal.imageUrl({ id: config.backgroundImage, scale: 'block(140, 55)'}) : null,
        sponsorData: sponsors
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
};

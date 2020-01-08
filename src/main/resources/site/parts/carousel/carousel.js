var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('carousel.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;

    /* ### Manipulate ### */
    let elements = [];
    if (config.elements != null && config.elements != undefined) {
        elements = libUtil.data.forceArray(config.elements);
        elements.forEach(element => {
            element.picture = libPortal.imageUrl({ id: element.picture, scale: 'width(532)' });
        });
    }

    /* log.info('%s', JSON.stringify(elements, null, 4)); */

    /* ### Prepare ### */
    var model = {
        content: content,
        component: component,
        description: config.description,
        elements: elements,
    };

    var scriptUrl = libPortal.assetUrl({
        path: '/js/bundle.js'
    });

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model), // Render the dynamic HTML with values from the model
        pageContributions: {
            headEnd: [
                `<script src='${scriptUrl}'></script>`
            ]
        }
    };
};

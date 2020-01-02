var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('testimonial.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;

    /* ### Manipulate ### */
    let testimonials = [];
    if (config.testimonials != null && config.testimonials != undefined) {
        testimonials = libUtil.data.forceArray(config.testimonials);
        testimonials.forEach(element => {
            if (element.speaker != null && element.speaker != undefined) {
                element.testimonial = libPortal.processHtml({ value: element.testimonial });
                let speakerData = libContent.get({ key: element.speaker });
                element.speaker = {
                    image: libPortal.imageUrl({ id: speakerData.data.image, scale: 'block(65, 65)' }),
                    name: speakerData.displayName,
                    title: speakerData.data.title,
                    url: libPortal.pageUrl({ id: speakerData._id })
                };
            }
        });
    }

    /* log.info('testimonial.js JSON %s', JSON.stringify(testimonials, null, 4)); */

    /* ### Prepare ### */
    var model = {
        content: content,
        component: component,
        description: config.description,
        testimonials: testimonials
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
};

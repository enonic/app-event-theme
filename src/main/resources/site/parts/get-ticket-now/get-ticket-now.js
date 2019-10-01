var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
/* var libUtil = require('/lib/util'); */

var viewFile = resolve('get-ticket-now.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;
    let site = libPortal.getSite();
    let properName = app.name.replace(/\./g, '-');
    let siteConfig = site.x[properName].siteConfig;

    /* ### Manipulate ### */
    /* log.info('get-ticket-now.js JSON %s', JSON.stringify(tickets, null, 4)); */

    /* ### Prepare ### */
    var model = {
        content: content,
        component: component,
        description: config.description,
        ticketUrl: siteConfig.ticketUrl,
        backgroundImage: libPortal.imageUrl({ id: config.backgroundImage, scale: 'max(1920, 1667)'}),
        foregroundImage: libPortal.imageUrl({ id: config.foregroundImage, scale: 'block(399, 492)'}),
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
};
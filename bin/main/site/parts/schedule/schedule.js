var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('schedule.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    let site = libPortal.getSite();
    let config = component.config;

    let properName = app.name.replace(/\./g, '-');
    let siteConfig = site.x[properName].siteConfig;

    /* ### Manipulate ### */

    // days
    function formatDate(date) { // returns a formatted date, e.g "17 August 2019"
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }

    let fromDate = new Date(siteConfig.fromDate);
    // let toDate = new Date(siteConfig.toDate);
    // let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // let diffDays = Math.round(Math.abs((fromDate.getTime() - toDate.getTime()) / (oneDay))) + 1;
    let numDays = [];

    // talks
    let talks = libUtil.data.forceArray(config.talks);
    if (talks != null && talks != undefined) {
        talks.forEach(element => {
            if (element != null && element != undefined) {
                if (element.speaker != null && element.speaker != undefined) {
                    let speaker = libContent.get({ key: element.speaker });
                    element.image = libPortal.imageUrl({ id: speaker.data.image, scale: 'block(65, 65)' });
                    element.name = speaker.displayName;
                    element.url = libPortal.pageUrl({ id: speaker._id });
                    
                    if (element.day > numDays.length)
                        numDays.push(parseInt(element.day));
                }
            }
        });
    }

    let days = [];
    numDays.forEach(element => {
        let date = new Date(fromDate);
        date.setDate(date.getDate() + element - 1);
        days.push({
            day: element | 0,
            date: formatDate(date)
        });
    });

    let mediaUrl;
    if (config.scheduleMedia !== null && config.scheduleMedia !== undefined) {
        mediaUrl = libPortal.attachmentUrl({
            path: libContent.get({ key: config.scheduleMedia })._path,
            type: "absolute"
        });
    }

    /* log.info('schedule.js JSON %s', JSON.stringify(diffDays, null, 4)); */

    /* ### Prepare ### */
    var model = {
        content: content,
        component: component,
        title: site.displayName,
        description: config.description,
        talks: talks,
        days: days,
        mediaUrl: mediaUrl,
    };

    var scriptUrl = libPortal.assetUrl({
        path: '/js/bundle.js'
    });

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model),
        pageContributions: {
            headEnd: [
                `<script src='${scriptUrl}'></script>`
            ]
        }
    };
};

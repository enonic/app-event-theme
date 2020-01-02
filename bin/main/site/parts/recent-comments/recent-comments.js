var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
// var libUtil = require('/lib/util');

var viewFile = resolve('recent-comments.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    // let config = component.config;
    let site = libPortal.getSite();

    /* ### Manipulate ### */
    let comments = [];
    let results = libContent.query({
        start: 0,
        count: 20,
        query: "data.newsArticle = '" + content._id + "' AND _path LIKE '/content" + site._path + "/*'" ,
        sort: 'createdTime DESC',
        contentTypes: [app.name + ':comment']
    });

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < results.hits.length; i++) {
        let date = new Date(results.hits[i].createdTime.split('T')[0]);
        let dateLabel = " " + date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
        comments.push({
            date: dateLabel,
            name: results.hits[i].data.name,
            comment: results.hits[i].data.comment,
        });
    }

    /* log.info('recent-comments %s', JSON.stringify(comments, null, 4)); */

    /* ### Prepare ### */
    let model = {
        content: content,
        component: component,
        numComments: results.hits.length,
        comments: comments,
        parentPath: content._path,
        parentId: content._id,
    };

    /* ### Return ### */
    return {
        body: libThymeleaf.render(viewFile, model)
    };
}

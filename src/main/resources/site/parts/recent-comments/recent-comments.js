var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libContent = require('/lib/xp/content');
var libUtil = require('/lib/util');

var viewFile = resolve('recent-comments.html');

exports.get = function (req) {

    /* ### Collect ### */
    let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
    let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    let config = component.config;

    /* ### Manipulate ### */
    let maxComments = config.maxComments || 5;
    let title = config.title || 'Recent comments';
    let comments = [];

    let results = libContent.query({
        start: 0,
        count: maxComments,
        //query: ,
        sort: 'createdTime DESC',
        contentTypes: [
            app.name + ':comment'
        ]
    });

    for (let i = 0; i < results.hits.length; i++) {
        libUtil.data.deleteEmptyProperties(results.hits[i].data);
        results.hits[i].data.key = results.hits[i]._id;

        let post = libUtil.content.get(results.hits[i].data.post);
        results.hits[i].data.postTitle = post.displayName;
        results.hits[i].data.postPath = post._path;

        comments.push(results.hits[i].data);

        log.info('recent-comments %s', JSON.stringify(comments, null, 4));

        /* ### Prepare ### */
        let model = {
            content: content,
            component: component,
            comments: comments,
        };

        /* ### Return ### */
        return {
            body: libThymeleaf.render(viewFile, model)
        };
    }
}

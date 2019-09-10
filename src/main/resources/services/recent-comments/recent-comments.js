var libContent = require('/lib/xp/content');

exports.post = function (req) { // /_/service/app.event.theme/contact  
  try { // Check if content already exists.
    let uniqueNumber = new Date();
    var result = libContent.create({
      name: 'comment-' + uniqueNumber.getTime(),
      parentPath: req.params._path,
      contentType: app.name + ':comment',
      data: {
        name: req.params.name,
        comment: req.params.content,
        newsArticle: req.params._id,
      }
    });
    /* log.info('Content created with id ' + result2._id); */
  } catch (e) {
    if (e.code == 'contentAlreadyExists') {
      log.error('There is already a content with that name');
    } else {
      log.error('Unexpected error: ' + e.message);
    }
    return false;
  }

  return {
    body: JSON.stringify(result),
    contentType: "application/json"
  };
};

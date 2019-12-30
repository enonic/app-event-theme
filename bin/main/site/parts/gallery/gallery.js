var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('gallery.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;
	
	/* ### Manipulate ### */
	let galleries = [];
	if (config.galleries != null && config.galleries != undefined) {
		galleries = libUtil.data.forceArray(config.galleries);
		galleries.forEach(gallery => {
			gallery.images = libUtil.data.forceArray(gallery.images);
			gallery.images.forEach(function(image, index) {
				gallery.images[index] = libPortal.imageUrl({ id: image, scale: 'max(315, 221)'});
			});
		});
	}
	
    /* log.info('gallery.js JSON %s', JSON.stringify(galleries, null, 4)); */

    /* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        description: config.description,
        galleries: galleries,
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

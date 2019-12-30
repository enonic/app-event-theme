var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('speaker.html');

exports.get = function(req) {

	/* ### Collect ### */
	var content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	var component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
    
	/* ### Manipulate ### */
	content.data.personalSkills = libUtil.data.forceArray(content.data.personalSkills);
	content.data.image = libPortal.imageUrl({ id: content.data.image, scale: 'block(431, 453)' });
	content.data.personalInformation = libPortal.processHtml({ value: content.data.personalInformation });
	content.data.description = libPortal.processHtml({ value: content.data.description });

	/* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        speaker: content
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};

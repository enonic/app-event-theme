var libPortal = require('/lib/xp/portal');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');
var libAuth = require('/lib/xp/auth');
var libContent = require('/lib/xp/content');

var viewFile = resolve('news-article.html');

var searchResultsPageExists = false;

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format
	let config = component.config;

	if (searchResultsPageExists == false) {
		var site = libPortal.getSite();
		var searchUrl = libContent.get({
			key: site._path + "/search-results",
		});
		if (searchUrl != null) {
			searchResultsPageExists = !searchResultsPageExists;
		}
	}

	/* ### Manipulate ### */
	let siteUrl = libPortal.pageUrl({
		id: libPortal.getSite()._id
	});

	content.data.tag = libUtil.data.forceArray(content.data.tag);

	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let published = {};
	let date = new Date(content.createdTime.split('T')[0]);

	if (content.createdTime) {
		published.day = date.getDate() | 0;
		published.month = months[date.getMonth()]
		published.year = date.getFullYear() | 0;
	}

	content.owner = libAuth.getPrincipal(content.owner).displayName;

	if (content.data.description === undefined || content.data.description === null) { // dummy data
		content.data.description = `<p>
			Vestibulum volutpat pretium libero. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue,
			ac auctor orci leo non est. Phasellus gravida semper nisi. In auctor lobortis lacus. Vivamus quis mi.
			Nullam dictum felis eu pede mollis pretium. Etiam sit amet orci eget eros faucibus tincidunt. Phasellus consectetuer vestibulum elit.
			In ut quam vitae odio lacinia tincidunt. Morbi vestibulum volutpat enim.
			Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Curabitur vestibulum aliquam leo. Mauris sollicitudin fermentum libero.
 			Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing.
			Maecenas malesuada. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.
 			Phasellus a est. Fusce pharetra convallis urna. Fusce risus nisl, viverra et, tempor et, pretium in, sapien.
			Sed aliquam ultrices mauris. Fusce neque. Nunc nonummy metus. Pellentesque ut neque. Sed mollis, eros et ultrices tempus,
			mauris ipsum aliquam libero, non adipiscing dolor urna a orci.
		</p>
		<p>
			Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.
			Ut a nisl id ante tempus hendrerit. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque
			ante vel mi. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Duis vel nibh at velit scelerisque suscipit.
			Sed lectus. Nullam vel sem. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Vestibulum rutrum, mi nec elementum vehicula,
			eros quam gravida nisl, id fringilla neque ante vel mi. Nulla facilisi.
			Sed cursus turpis vitae tortor. Aenean massa. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Morbi vestibulum volutpat enim.
			Nullam dictum felis eu pede mollis pretium.
			Sed aliquam ultrices mauris. Quisque malesuada placerat nisl. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh,
			nec pellentesque velit pede quis nunc. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.
			Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi.
			Quisque id odio. Etiam vitae tortor. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus.
			Vivamus in erat ut urna cursus vestibulum. Morbi nec metus.
		</p>`
	}

	/* log.info('news-article.js JSON %s', JSON.stringify(content.data, null, 4)); */

	/* ### Prepare ### */
	let model = {
		content: content,
		component: component,
		newsArticle: content,
		published: published,
		hideDate: config.hideDate,
		siteUrl: siteUrl,
		searchResultsPageExists: searchResultsPageExists,
	};


	let scriptUrl = libPortal.assetUrl({
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

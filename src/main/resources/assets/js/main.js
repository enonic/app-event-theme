/* console.log('main.js') */
import '../styles/main.scss';

/* 
import '../styles/main.scss';

import example from './example';

example();
 */

var $ = require('./jquery.min.js');
window.$ = $;

// parts
require('./parts/faq.js');
require('./parts/search.js');
require('./parts/register-to.js');
require('./parts/schedule.js');
require('./parts/contact.js');
require('./parts/gallery.js');
require('./parts/banner.js');
require('./parts/tag-search.js');
require('./parts/category-search.js');

// pages
require('./pages/default.js');
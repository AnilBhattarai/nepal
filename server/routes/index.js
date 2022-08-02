const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Roles
const roleRoutes = require('./api/roles');
router.use('/role', roleRoutes);
// All route of Content
const contentRoutes = require('./api/content');
router.use('/contents', contentRoutes);
// All route of Contact
const contactRoutes = require('./api/contact');
router.use('/contact', contactRoutes);
// All route of Contact
const resourceRoutes = require('./api/resource');
router.use('/resource', resourceRoutes);
// All route of Media
const mediaRoutes = require('./api/media');
router.use('/media', mediaRoutes);
// All route of Media
const filesRoutes = require('./api/files');
router.use('/files', filesRoutes);
// All route of setting
const settingRoutes = require('./api/setting');
router.use('/setting', settingRoutes);
// All route of bugs
const bugRoutes = require('./api/bugs');
router.use('/bug', bugRoutes);
// All route of blogs
const blogRoutes = require('./api/blog');
router.use('/blog', blogRoutes);
// All route of sliders
const sliderRoutes = require('./api/slider');
router.use('/slider', sliderRoutes);
// All route of faqs
const faqRoutes = require('./api/faq');
router.use('/faq', faqRoutes);
// All route of Dynamic Module
const dynamicModuleRoutes = require('./api/module');
router.use('/module', dynamicModuleRoutes);
// All route of Subscribe
const subscribeRoutes = require('./api/subscribe');
router.use('/subscribe', subscribeRoutes);
// All route of templates (email)
const template = require('./api/template');
router.use('/template', template);
// All route of enum module
const enums = require('./api/enum');
router.use('/enum', enums);
// All route of Static Data from DB Module
const staticRoutes = require('./api/static');
router.use('/static', staticRoutes);
// All route of Static Data from Property Module
const propertyRoutes = require('./api/property');
router.use('/property', propertyRoutes);
// All route of Static Data from Agency Module
const agencyRoutes = require('./api/agency');
router.use('/agency', agencyRoutes);
// All route of meta module (meta data)
const meta = require('./api/meta');
router.use('/meta', meta);
// All route of careers module
const careers = require('./api/careers');
router.use('/careers', careers);

// All route of comment module (comments)
const comment = require('./api/comment');
router.use('/comment', comment);
// All route of myRequest module (myRequest)
const myRequest = require('./api/myRequest');
router.use('/myrequest', myRequest);

// All route of Favourite Property
const favorite = require('./api/favorite');
router.use('/favorite', favorite);
// All route of forums module
const forum = require('./api/forum');
router.use('/forum', forum);

// All route of menu module
const menuRoutes = require('./api/menu');
router.use('/menu', menuRoutes);
// All route of Team module
const teamRoutes = require('./api/team');
router.use('/team', teamRoutes);

// All route of comment module (comments)
const commentRoutes = require('./api/comment');
router.use('/comment', commentRoutes);
// All route of Developer
const developer = require('./api/developer');
router.use('/developer', developer);
// All route of form module
const form = require('./api/form');
router.use('/form', form);
// All route of directory module
const directoryRoutes = require('./api/directory');
router.use('/directory', directoryRoutes);

// All route of Bankdetailforloan module
const Bankdetailforloan = require('./api/bankDetailForLoan');
router.use('/bankdetailforloan', Bankdetailforloan);
module.exports = router;

// All route of company
const company = require('./api/company');
router.use('/company', company);

// All route of notification
const notification = require('./api/notification');
router.use('/notification', notification);

// feedback routes
const feedback = require('./api/feedback');

router.use('/feedback', feedback);

// contact agency routes

const agency = require('./api/contactagent');
router.use('/contactagent', agency);

// contact developer routes

const contactdeveloper = require('./api/contactdeveloper');
router.use('/contactdeveloper', contactdeveloper);

// All route of notificationmobile
const notificationmob = require('./api/notificationmobile');
router.use('/notificationmobile', notificationmob);

// All route of report
const reportRouter = require('./api/reports');
router.use('/report', reportRouter);
// All route of lead
const leadRouter = require('./api/lead');
router.use('/lead', leadRouter);

// All Route of popup
const popup = require('./api/popup');
router.use('/popup', popup);

//view count
const viewCount = require('./api/viewCount');
router.use('/view-count', viewCount);

//search filter
// All route of searchFilter
const searchFilterRoutes = require('./api/searchFilter');
router.use('/search-filter', searchFilterRoutes);

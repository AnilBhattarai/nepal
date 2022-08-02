const developerSch = require('./developerSchema');
const gravatar = require('gravatar');
const userSch = require('./userSchema');
const roleSch = require('../role/roleSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const httpStatus = require('http-status');
const emailHelper = require('./../../helper/email.helper');
const renderMail = require('./../template/templateController').internal;
const thirdPartyApiRequesterHelper = require('../../helper/apicall.helper');
const otherHelper = require('../../helper/others.helper');
const accessSch = require('../role/accessSchema');
const moduleSch = require('../role/moduleSchema');
const { secretOrKey, oauthConfig, tokenExpireTime } = require('../../config/keys');
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');
const loginLogs = require('./loginlogs/loginlogController').internal;
// const PushTokenSch = require('./pushToken');
// const pushNoti = require('../../helper/pushNotificationreactnative');
const pushnotification = require('../../helper/pushnotification');
const notificationmobile = require('../notificationmobile/notificationmobile');
const appSetting = require('../../config/settings');

const userController = {};

userController.sendPushNotification = async (next) => {
  try {
    var message = {
      data: {
        //This is only optional, you can send any data
        score: '850',
        time: '2:45',
      },
      notification: {
        title: 'Title of notification',
        body: 'Body of notification',
      },
      token: 'AAAAeYgfWls:APA91bG4xBvsuWVX3Ojhvdlax2ivbc6RnDQ73n4Za21AyX0kuEZk9Wy7fFn387hWnxhHh3xBwA4N8pZegsgCDZkhyaL0yNF-9LIsKV4vupSooX1nUbs6j7FMAPs6gg0eDqQgS6S7sH7c',
    };
    const d = await pushNoti.send(message);
    return d;
  } catch (err) {
    next(err);
  }

  //     let fcmToken = 'eO707IX2Woc:APA91bHKEu_-E6VrNJBY-rRGPP6Aw2k9SaDO97VnSmlpx7ETajfxIof0zAB_eeTBmqcqGe6xv0aH2vCsCMYrmlKKUF4QEASyjqLtsjkeaXI748JBoJzExIVu-2iumCPk5drU66xZboxT'
  //      const d=    await pushNotification.sendToken(fcmToken ,noti , options,next);
  // return d;
};

userController.PostUser = async (req, res, next) => {
  try {
    let user = req.body;
    if (user.password) {
      let salt = await bcrypt.genSalt(10);
      let hashPwd = await bcrypt.hash(req.body.password, salt);
      user.password = hashPwd;
    }
    if (user.roles.includes('5d63c973ab1e86026c492d83')) {
      const update = await userSch.findByIdAndUpdate(user._id, {
        $set: { 'user.author.is_apply': true },
        updated_at: Date.now(),
      });
    }
    if (user && user._id) {
      const update = await userSch.findByIdAndUpdate(user._id, {
        $set: user,
        updated_at: Date.now(),
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user update success!!', null);
    } else {
      const newUser = new userSch(user);
      const userSave = await newUser.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user add success!!', null);
    }
  } catch (err) {
    next(err);
  }
};

userController.PostUserPwd = async (req, res, next) => {
  try {
    let user = {};
    const { email, name, email_verified, roles } = req.body;
    user = { email, name, email_verified, roles };
    let salt = await bcrypt.genSalt(10);
    let hashPwd = await bcrypt.hash(req.body.password, salt);
    if (req.body && req.body._id) {
      const update = await userSch.findByIdAndUpdate(req.body._id, {
        $set: { password: hashPwd, last_password_change_date: new Date() },
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'user password update success!!', null);
    } else {
      user.password = hashPwd;
      user.last_password_change_date = new Date();
      const newUser = new userSch(user);
      const userSave = await newUser.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, userSave, null, 'user add success!!', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.CheckMail = async (req, res) => {
  let errors = {};
  const email = req.body.email.toLowerCase();
  const user = await userSch.findOne({ email });
  const data = { email };
  if (!user) {
    errors.email = 'Mail not found';
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Mail found', null);
};

userController.GetAllUserGroupBy = async (req, res, next) => {
  try {
    const role = await roleSch.find({ is_deleted: false }).select('role_title');
    let user = await userSch.find({ is_deleted: false });
    let totalData = await userSch.countDocuments({ is_deleted: false });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { role, user }, 'users by group by get success!!', 1, 1, totalData);
  } catch (err) {
    next(err);
  }
};

userController.GetAllUser = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_email) {
      searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_email) {
      searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
    }

    if (req.query.find_agent == 'agent') {
      searchQuery = { roles: '5d63c938ab1e86026c492d81', ...searchQuery };
    }

    if (req.query.find_builder == 'builder') {
      searchQuery = { roles: '5d63c951ab1e86026c492d82', ...searchQuery };
    }

    if (req.query.find_author == 'author') {
      searchQuery = { roles: '5d63c973ab1e86026c492d83', ...searchQuery };
    }

    if (req.query.find_admin == 'admin') {
      searchQuery = { roles: '5bf7af0a736db01f8fa21a25', ...searchQuery };
    }

    if (req.query.find_super_admin == 'super_admin') {
      searchQuery = { roles: '5bf7ae3694db051f5486f845', ...searchQuery };
    }

    if (req.query.find_normal_user == 'normal_user') {
      searchQuery = { roles: '5bf7ae90736db01f8fa21a24', ...searchQuery };
    }
    if (req.query.filter_author == 'true') {
      searchQuery = { roles: '5d63c973ab1e86026c492d83', ...searchQuery };
    }
    selectQuery = 'name email password avatar bio email_verified mobile_no roles agent builder author';

    // if (req.query.filter_author) {
    //   searchQuery = { roles: { $in: roles }, ...searchQuery };
    // }
    // selectQuery = 'name email password bio email_verified roles';
    populate = [{ path: 'roles', select: 'role_title' }];
    const datas = await otherHelper.getquerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, config.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};

userController.getAgent = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery = { $or: [{ roles: '5d63c938ab1e86026c492d81' }, { 'agent.is_apply': true }] };
    let sortQuery = { _id: -1 };
    let populate;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }

    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_email) {
      searchQuery = {
        email: { $regex: req.query.find_email, $options: 'i' },
        ...searchQuery,
      };
    }

    if (req.query.find_is_verified) {
      searchQuery = {
        'agent.is_verified': req.query.find_is_verified,
        ...searchQuery,
      };
    }

    selectQuery = 'name email password avatar bio email_verified roles agent builder author';

    populate = [
      { path: 'roles', select: 'role_title' },
      { path: 'agent.agency', select: 'title slug_url email website  logo address description phone mobile  is_approved is_active' },
    ];

    let data = await otherHelper.getquerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Agent List', page, size, data.totaldata);
  } catch (err) {
    next(err);
  }
};

userController.getBuilder = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery = { $or: [{ roles: '5d63c951ab1e86026c492d82' }, { 'builder.is_apply': true }] };
    let sortQuery = { _id: -1 };
    let populate;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }

    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_email) {
      searchQuery = {
        email: { $regex: req.query.find_email, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_is_verified == 'false') {
      searchQuery = {
        'builder.is_verified': req.query.find_is_verified,
      };
    }
    if (req.query.find_is_verified) {
      searchQuery = {
        'builder.is_verified': req.query.find_is_verified,
        ...searchQuery,
      };
    }

    selectQuery = 'name email password avatar bio email_verified roles agent builder author';

    populate = [{ path: 'roles', select: 'role_title' }];

    let data = await otherHelper.getquerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Builder List', page, size, data.totaldata);
  } catch (err) {
    next(err);
  }
};

userController.getAuthor = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery = { $or: [{ roles: '5d63c973ab1e86026c492d83' }, { 'author.is_apply': true }] };
    let sortQuery = { _id: -1 };
    let populate;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }

    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_email) {
      searchQuery = {
        email: { $regex: req.query.find_email, $options: 'i' },
        ...searchQuery,
      };
    }

    if (req.query.find_is_verified) {
      searchQuery = {
        'author.is_verified': req.query.find_is_verified,
        ...searchQuery,
      };
    }

    selectQuery = 'name email password avatar bio email_verified roles agent builder author social_link';

    populate = [{ path: 'roles', select: 'role_title' }];

    let data = await otherHelper.getquerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'Author List', page, size, data.totaldata);
  } catch (err) {
    next(err);
  }
};

userController.GetUserDetail = async (req, res, next) => {
  try {
    const user = await userSch.findById(req.params.id, {
      email_verified: 1,
      roles: 1,
      name: 1,
      email: 1,
      image: 1,
      bio: 1,
      updated_at: 1,
      mobile_no: 1,
    });
    const role = await roleSch.find({ is_deleted: false }, { role_title: 1, _id: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { users: user, roles: role }, null, config.get, null);
  } catch (err) {
    next(err);
  }
};

userController.Register = async (req, res, next) => {
  if (!appSetting.public_register_allow) {
    return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, null, 'Public Registration not allowed.', null);
  }
  let email = req.body.email && req.body.email.toLowerCase();
  const user = await userSch.findOne({ email: email });
  if (user) {
    const errors = { email: 'Email already exists' };
    const data = { email: email };
    return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
  } else {
    const { name, password, gender } = req.body;
    const newUser = new userSch({ name, email, password, gender });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    newUser.email_verification_code = otherHelper.generateRandomHexString(12);
    newUser.email_verified = false;
    newUser.roles = appSetting.public_register_role;
    newUser.last_password_change_date = new Date();
    newUser.email_verified_request_date = new Date();
    const user = await newUser.save();
    const renderedMail = await renderMail.renderTemplate(
      appSetting.public_register_email_template,
      {
        name: newUser.name,
        email: newUser.email,
        code: newUser.email_verification_code,
      },
      newUser.email,
    );
    if (renderMail.error) {
      console.log('render mail error: ', renderMail.error);
    } else {
      emailHelper.send(renderedMail);
    }
    if (appSetting.force_allow_email_verify) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { email_verified: false, email: email }, null, 'Verification email sent.', null);
    }
    const { token, payload } = await userController.validLoginResponse(req, user, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
  }
};
userController.validLoginResponse = async (req, user, next) => {
  try {
    let accesses = await accessSch.find({ role_id: user.roles, is_active: true }, { access_type: 1, _id: 0 });
    let routes = [];
    if (accesses && accesses.length) {
      const access = accesses.map((a) => a.access_type).reduce((acc, curr) => [...curr, ...acc]);
      const routers = await moduleSch.find({ 'path._id': access }, { 'path.admin_routes': 1, 'path.access_type': 1 });
      for (let i = 0; i < routers.length; i++) {
        for (let j = 0; j < routers[i].path.length; j++) {
          routes.push(routers[i].path[j]);
        }
      }
    }

    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      gender: user.gender,
      mobile_no: user.mobile_no,
    };
    // Sign Token
    let token = await jwt.sign(payload, secretOrKey, {
      expiresIn: tokenExpireTime,
    });
    loginLogs.addloginlog(req, token, next);
    token = `Bearer ${token}`;
    payload.routes = routes;
    return { token, payload };
  } catch (err) {
    next(err);
  }
};
userController.RegisterFromAdmin = async (req, res, next) => {
  try {
    const user = await userSch.findOne({ email: req.body.email, is_deleted: false });
    if (user) {
      errors.email = 'Email already exists';
      const data = { email: req.body.email };
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
    } else {
      if (req.file) {
        req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
        req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
        req.body.image = req.file;
      }
      const { name, email, password, date_of_birth, bio, location, phone, description, is_active, email_verified, roles, image, company_name, company_location, company_established, company_phone_no } = req.body;
      const newUser = new User({ name, email, password, date_of_birth, bio, description, email_verified, is_active, roles, image, location, phone, company_name, company_location, company_established, company_phone_no });
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.email_verified = false;
          newUser.roles = roles;
          newUser.added_by = req.user.id;
          newUser.is_active = true;
          newUser.is_added_by_admin = true;
          const user = await newUser.save();
          const payload = {
            id: user._id,
            name: user.name,
            image: user.image,
            email: user.email,
            email_verified: user.email_verified,
            roles: user.roles,
            gender: user.gender,
            mobile_no: user.mobile_no,
          };
          const msg = config.registerAdmin;
          return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, msg, null);
        });
      });
    }
  } catch (err) {
    return next(err);
  }
};

userController.UpdateUserDetail = async (req, res, next) => {
  try {
    const { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no } = req.body;
    const id = req.params.id;

    let newdatas = { name, date_of_birth, email_verified, roles, bio, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date() };

    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
      newdatas.image = req.file;
    }

    const updateUser = await userSch.findByIdAndUpdate(id, { $set: newdatas }, { new: true });
    const msg = 'User Update Success';
    const msgfail = 'User not found';

    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, req.body, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.UpdateUserPhoto = async (req, res, next) => {
  try {
    const id = req.user.id;

    let newdatas = {};
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
      newdatas.image = req.file;
    }

    const updateUser = await userSch.findByIdAndUpdate(id, { $set: newdatas }, { new: true });
    const msg = 'Profile Picture Update Success Success';
    const msgfail = 'User not found';
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, newdatas, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};
userController.UpdateUserPhotoByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    let newdatas = {};
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
      newdatas.image = req.file;
    }

    const updateUser = await userSch.findByIdAndUpdate(id, { $set: newdatas }, { new: true });
    const msg = 'Profile Picture Update Success Success';
    const msgfail = 'User not found';
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, newdatas, null, msg, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};
userController.Verifymail = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const code = req.body.code;
    const user = await userSch.findOne({ email, email_verification_code: code });
    const data = { email };
    if (!user) {
      let errors = {};
      errors.email = 'Invalid Verification Code';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, data, null, errors.email, null);
    }
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    const { token, payload } = await userController.validLoginResponse(req, d, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, config.emailVerify, token);
  } catch (err) {
    next(err);
  }
};

userController.ResendVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await userSch.findOne({ email });
    if (user) {
      if (user.email_verified) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Verified', null);
      } else {
        const currentDate = new Date();
        const diff = parseInt((currentDate - user.email_verified_request_date) / (1000 * 60)); //in minute
        if (diff < 10) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Sent', null);
        }
        const email_verification_code = otherHelper.generateRandomHexString(12);
        const newUser = await userSch.findOneAndUpdate({ email: email }, { $set: { email_verification_code, email_verified: false, email_verified_request_date: currentDate } }, { new: true });
        const renderedMail = await renderMail.renderTemplate(
          appSetting.verify_mail_template,
          {
            name: user.name,
            email: user.email,
            code: email_verification_code,
          },
          user.email,
        );
        if (renderMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
          const dataReturn = { email: user.email, name: user.name };
          return otherHelper.sendResponse(res, httpStatus.OK, true, dataReturn, null, 'Email verification code Sent!!', null);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

userController.VerifyServerMail = async (req, res, next) => {
  try {
    const { id, code } = req.params;
    const user = await userSch.findOne({ _id: id, email_verification_code: code });
    if (!user) {
      return res.redirect(302, 'http://localhost:5200?verify=false');
    }
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { email_verified: true }, $unset: { email_verification_code: 1 } }, { new: true });
    const payload = {
      id: user._id,
      iss: 'http://localhost:5200',
      name: user.name,
      email: user.email,
      email_verified: true,
      roles: user.roles,
      gender: user.gender,
      mobile_no: user.mobile_no,
    };
    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime }, (err, token) => {
      const msg = config.emailVerify;
      token = `${token}`;

      res.cookie('token', token); // add cookie here
      res.cookie('email', user.email); // add cookie here
      return res.redirect(302, 'http://localhost:5200?verify=true');
    });
  } catch (err) {
    next(err);
  }
};

userController.ForgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const errors = {};
    const user = await userSch.findOne({ email });
    const data = { email };
    if (!user) {
      errors.email = 'Email not found';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    const currentDate = new Date();
    if (user.password_reset_request_date) {
      const diff = parseInt((currentDate - user.password_reset_request_date) / (1000 * 60)); //in minute
      if (diff < 10) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, { email }, null, 'Email Already Sent, Check your Inbox', null);
      }
    }
    user.password_reset_code = otherHelper.generateRandomHexString(6);
    user.password_reset_request_date = currentDate;
    const update = await userSch.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password_reset_code: user.password_reset_code,
          password_reset_request_date: user.password_reset_request_date,
        },
      },
      { new: true },
    );

    const renderedMail = await renderMail.renderTemplate(
      appSetting.forgot_password_mail_template,
      {
        name: user.name,
        email: user.email,
        code: user.password_reset_code,
      },
      user.email,
    );
    if (renderMail.error) {
      console.log('render mail error: ', renderMail.error);
    } else {
      emailHelper.send(renderedMail);
    }

    const msg = `Password Reset Code For ${email} is sent to email`;
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, msg, null);
  } catch (err) {
    next(err);
  }
};

userController.ResetPassword = async (req, res, next) => {
  try {
    let { email, code, password } = req.body;
    email = email.toLowerCase();
    const user = await userSch.findOne({ email, password_reset_code: code });
    const data = { email };
    const errors = {};
    if (!user) {
      errors.email = 'Invalid Password Reset Code';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, data, errors, errors.email, null);
    }
    let salt = await bcrypt.genSalt(10);
    let hashpw = await bcrypt.hash(password, salt);
    const d = await userSch.findByIdAndUpdate(user._id, { $set: { password: hashpw, last_password_change_date: Date.now(), email_verified: true }, $unset: { password_reset_code: 1, password_reset_request_date: 1 } }, { new: true });
    // Create JWT payload

    const { token, payload } = await userController.validLoginResponse(req, d, next);
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
  } catch (err) {
    return next(err);
  }
};

userController.Login = async (req, res, next) => {
  try {
    let errors = {};
    const password = req.body.password;
    let email = req.body.email.toLowerCase();
    const user = await userSch.findOne({ email });
    if (!user) {
      errors.email = 'User not found';
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, errors, errors.email, null);
    } else {
      if (appSetting.force_allow_email_verify && !user.email_verified) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, { email: email, email_verified: false }, null, 'Please Verify your Email', null);
      }
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { token, payload } = await userController.validLoginResponse(req, user, next);
        return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, null, token);
      } else {
        errors.password = 'Password incorrect';
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
      }
    }
  } catch (err) {
    next(err);
  }
};

userController.Info = (req, res, next) => {
  return otherHelper.sendResponse(res, httpStatus.OK, true, req.user, null, null, null);
};
userController.GetProfile = async (req, res, next) => {
  try {
    let populate = [{ path: 'roles', select: '_id role_title' }];
    const userProfile = await userSch.findById(req.user.id, 'name date_of_birth email added_at email_verified roles avatar image mobile_no social_link').populate(populate);
    return otherHelper.sendResponse(res, httpStatus.OK, true, userProfile, null, null, null);
  } catch (err) {
    next(err);
  }
};

userController.postProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
      req.body.image = req.file;
    }
    const { name, date_of_birth, bio, description, image, phone, location, company_name, company_location, company_established, company_phone_no, social_link, mobile_no, mobile_prefix } = req.body;
    const updateUser = await userSch.findByIdAndUpdate(req.user.id, { $set: { name, date_of_birth, bio, image, description, phone, location, company_name, company_location, company_established, company_phone_no, updated_at: new Date(), social_link, mobile_no, mobile_prefix } }, { new: true });
    const msg = 'User Update Success';
    const msgfail = 'User not found.';
    const data = await userController.validLoginResponse(req, updateUser, next);
    if (updateUser && data) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { name, date_of_birth, bio, image, description, phone, location, company_name, company_location, company_established, company_phone_no, social_link, mobile_no, mobile_prefix }, null, msg, data.token);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, msgfail, null);
    }
  } catch (err) {
    return next(err);
  }
};

userController.changePassword = async (req, res, next) => {
  try {
    let errors = {};
    const { oldPassword, newPassword } = req.body;
    const user = await userSch.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPassword, salt);
      const dbRes = await userSch.findByIdAndUpdate(req.user.id, { $set: { password: hash, last_password_change_date: new Date() } }, { $new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, dbRes, null, 'Password Change Success', null);
    } else {
      errors.oldPassword = 'Old Password incorrect';
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
    }
  } catch (err) {
    next(err);
  }
};

userController.loginGOath = async (req, res, next) => {
  let profile = req.user;
  profile.email = profile.email.toLowerCase();
  const currentDate = new Date();
  let user = await userSch.findOne({ email: profile.email });
  const random_password = await otherHelper.generateRandomHexString(10);
  if (user) {
    if (!user.email_verified) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(random_password, salt);
      user = await userSch.findByIdAndUpdate(user._id, { $set: { password: hash, email_verified: true, last_password_change_date: currentDate, register_method: profile.provider } });
      user.email_verified = true;
    } else {
      const { token, payload } = await userController.validLoginResponse(req, user, next);
      return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Login Successfully', token);
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(random_password, salt);
    const newUser = new userSch({
      name: profile.name,
      email: profile.email,
      password: hash,
      email_verified: true,
      last_password_change_date: currentDate,
      register_method: profile.provider,
      roles: appSetting.public_register_role,
    });
    user = await newUser.save();
  }
  const renderedMail = await renderMail.renderTemplate(
    appSetting.public_register_oauth_template,
    {
      name: profile.name,
      email: profile.email,
      password: random_password,
      account: profile.provider,
    },
    profile.email,
  );
  if (renderMail.error) {
    console.log('render mail error: ', renderMail.error);
  } else {
    emailHelper.send(renderedMail);
  }
  const { token, payload } = await userController.validLoginResponse(req, user, next);
  return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, 'Register Successfully', token);
};

userController.getForAgent = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.user.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data.agent, null, 'Agency', null);
  } catch (err) {
    next(err);
  }
};

userController.applyForAgent = async (req, res, next) => {
  try {
    const { is_apply, agency, bio } = req.body;
    const updateUser = await userSch.findByIdAndUpdate(req.user.id, { $set: { agent: { is_apply, agency, updated_at: new Date(), bio } } }, { new: true });
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { is_apply, agency, updated_at: updateUser.updated_at, bio }, null, 'Agent Information', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'User Not found', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.getForBuilder = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.user.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data.builder, null, 'Builder Status', null);
  } catch (err) {
    next(err);
  }
};

userController.applyForBuilder = async (req, res, next) => {
  try {
    let { bio, name, logo, _id, website, phone, email, address, hex_code, tagline, banner, journey, business, factoids, future_ready, success_story } = req.body;
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        req.files[i].destination = req.files[i].destination.split('\\').join('/').split('server/')[1] + '/';
        req.files[i].path = req.files[i].path.split('\\').join('/').split('server/')[1];

        if (req.files[i].fieldname == 'logo') {
          logo = req.files[i];
        }
        if (req.files[i].fieldname == 'banner') {
          banner = req.files[i];
        }
      }
    }
    let d = {};
    if (bio) {
      d = { ...d, bio };
    }
    if (name) {
      d = { ...d, name };
    }
    if (logo) {
      d = { ...d, logo };
    }
    if (website) {
      d = { ...d, website };
    }
    if (phone) {
      d = { ...d, phone };
    }
    if (email) {
      d = { ...d, email };
    }
    if (address) {
      d = { ...d, address };
    }
    if (hex_code) {
      d = { ...d, hex_code };
    }
    if (tagline) {
      d = { ...d, tagline };
    }
    if (banner) {
      d = { ...d, banner };
    }
    if (journey) {
      d = { ...d, journey };
    }
    if (business) {
      d = { ...d, business };
    }
    if (factoids) {
      d = { ...d, factoids };
    }
    if (future_ready) {
      d = { ...d, future_ready };
    }
    if (success_story) {
      d = { ...d, success_story };
    }

    if (_id) {
      const updatedDeveloper = await developerSch.findOneAndUpdate({ _id: _id, added_by: req.user.id, is_verified: false }, { $set: d }, { new: true });
    } else {
      d.added_by = req.user.id;
      d.is_active = true;
      const newDeveloper = new developerSch(d);
      const new_developer = await newDeveloper.save();
      _id = new_developer._id;
    }
    const updateUser = await userSch.findByIdAndUpdate(req.user.id, { $set: { builder: { is_apply: true, updated_at: new Date(), developer: _id } } }, { new: true });
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { builder: { is_apply: true, updated_at: new Date(), developer: _id } }, null, 'Developer Information', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No Developer information !!', null);
    }
  } catch (err) {
    next(err);
  }
};
userController.getDevelopers = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_is_verified) searchQuery = { ...searchQuery, is_verified: req.query.find_is_verified };
    if (req.query.find_is_active) searchQuery = { ...searchQuery, is_active: req.query.find_is_active };
    let allData = await otherHelper.getquerySendResponse(developerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allData.data, 'Developer', page, size, allData.totaldata);
  } catch (err) {
    next(err);
  }
};
userController.getDeveloperForUser = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 0, false);
    searchQuery = { ...searchQuery, is_active: true, $or: [{ added_by: req.user.id }, { is_verified: true }] };
    selectQuery = 'bio name logo banner is_verified established_year projects_no added_by website phone email address hex_code tagline banner journey business factoids future_ready success_story';
    let allData = await developerSch.find(searchQuery, selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, allData, 'Developers');
  } catch (err) {
    next(err);
  }
};
userController.getDeveloperForPublic = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 0, false);
    searchQuery = { ...searchQuery, is_verified: true, is_active: true };
    selectQuery = 'bio name banner logo website established_year projects_no phone email address hex_code added_by';
    let allData = await otherHelper.getquerySendResponse(developerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allData.data, 'Developer', page, size, allData.totaldata);
  } catch (err) {
    next(err);
  }
};
userController.getDeveloperForPublicAll = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 0, false);
    searchQuery = { ...searchQuery, is_active: true };
    selectQuery = 'bio name logo banner established_year projects_no website phone email address hex_code added_by';
    let allData = await otherHelper.getquerySendResponse(developerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allData.data, 'Developer', page, size, allData.totaldata);
  } catch (err) {
    next(err);
  }
};
userController.getDeveloperDetail = async (req, res, next) => {
  try {
    const data = await developerSch.findById(req.params.id);
    const builder = await userSch.find({ 'builder.developer': req.params.id, 'builder.is_verified': true }, { name: 1, mobile_no: 1, photo: 1, email: 1, _id: 0 });
    const builder_total = await userSch.find({ 'builder.developer': req.params.id, 'builder.is_verified': true }).countDocuments();

    return otherHelper.sendResponse(res, httpStatus.OK, true, { data, builder, builder_total }, null, 'Developer information !!', null);
  } catch (err) {
    next(err);
  }
};
userController.postDevelopers = async (req, res, next) => {
  try {
    let { bio, established_year, projects_no, name, logo, _id, is_verified, is_active, website, phone, email, address, hex_code, tagline, banner, journey, business, factoids, future_ready, success_story, md_message, md_name, md_post } = req.body;
    let developer;
    let images = req.files;
    images.forEach((image) => {
      if (image.fieldname == 'logo') {
        logo = image;
      }
      if (image.fieldname == 'banner') {
        banner = image;
      }
    });
    if (_id) {
      developer = await developerSch.findByIdAndUpdate(_id, { $set: { bio, established_year, projects_no, name, logo, is_verified, is_active, website, phone, email, address, hex_code, tagline, banner, journey, business, factoids, future_ready, success_story, md_message, md_name, md_post } }, { new: true });
    } else {
      const newDeveloper = new developerSch({ bio, name, established_year, projects_no, logo, added_by: req.user.id, is_active, website, phone, email, address, hex_code, tagline, banner, journey, business, factoids, future_ready, success_story, md_message, md_name, md_post });
      developer = await newDeveloper.save();
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, developer, null, 'Developer information !!', null);
  } catch (err) {
    next(err);
  }
};
userController.getForAuthor = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.user.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data.author, null, 'Author Status', null);
  } catch (err) {
    next(err);
  }
};

userController.applyForAuthor = async (req, res, next) => {
  try {
    const { is_apply, bio } = req.body;
    const updateUser = await userSch.findByIdAndUpdate(req.user.id, { $set: { author: { is_apply, updated_at: new Date(), bio } } }, { new: true });
    if (updateUser) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, { is_apply, updated_at: updateUser.updated_at, bio }, null, 'Author Information', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No Author information !!', null);
    }
  } catch (err) {
    next(err);
  }
};

userController.verifyAgent = async (req, res, next) => {
  try {
    const { is_verified, _id } = req.body;
    const checkIf = await userSch.findOne({ _id: _id }).select('agent');
    if (!checkIf) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No Agent information !!', null);
    }
    if (checkIf.agent.is_apply == false) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'User have not applied to verify !!', null);
    }
    if (checkIf.agent.is_verified == true && req.body.is_verified == true) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'Agent has been already verified !!', null);
    }
    if (checkIf.agent.is_apply == true) {
      if (req.body.is_verified == true) {
        const apply = await userSch
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: { 'agent.is_verified': req.body.is_verified, 'agent.verified_at': Date.now(), 'agent.verified_by': req.user.id, 'agent.reason': req.body.reason },
              $push: { roles: '5d63c938ab1e86026c492d81' },
            },
            { new: true },
          )
          .select('agent');

        const renderedMail = await renderMail.renderTemplate(
          'agent_verification',
          {
            name: req.body.name,
            email: req.body.email,
            reason: req.body.reason,
          },
          req.body.email,
        );

        if (renderedMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
        }
        return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Verification Success !!', null);
      }
      if (req.body.is_verified == false) {
        const apply = await userSch
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: { 'agent.is_verified': req.body.is_verified, 'agent.verified_at': Date.now(), 'agent.verified_by': req.user.id, 'agent.reason': req.body.reason },
              $pull: { roles: '5d63c938ab1e86026c492d81' },
            },
            { new: true },
          )
          .select('agent ');

        const renderedMail = await renderMail.renderTemplate(
          'agent_unverification',
          {
            name: req.body.name,
            email: req.body.email,
            reason: req.body.reason,
          },
          req.body.email,
        );

        if (renderedMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
        }
        return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Unverified Success !!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

userController.verifyBuilder = async (req, res, next) => {
  try {
    const { is_verified, _id } = req.body;
    const checkIf = await userSch.findOne({ _id: _id }).select('builder');
    if (!checkIf) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No builder information !!', null);
    }
    if (checkIf.builder.is_apply == false) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'User have not applied to verify !!', null);
    }
    if (checkIf.builder.is_verified == true && req.body.is_verified == true) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'Builder has been already verified !!', null);
    }
    if (checkIf.builder.is_apply == true) {
      if (req.body.is_verified == true) {
        const apply = await userSch
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: { 'builder.is_verified': req.body.is_verified, 'builder.verified_at': Date.now(), 'builder.verified_by': req.user.id, 'builder.reason': req.body.reason },
              $push: { roles: '5d63c951ab1e86026c492d82' },
            },
            { new: true },
          )
          .select('builder');
        const renderedMail = await renderMail.renderTemplate(
          'builder_verification',
          {
            name: req.body.name,
            email: req.body.email,
            reason: req.body.reason,
          },
          req.body.email,
        );

        if (renderedMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
        }

        return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Verification Success !!', null);
      }
      if (req.body.is_verified == false) {
        const apply = await userSch
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: { 'builder.is_verified': req.body.is_verified, 'builder.verified_at': Date.now(), 'builder.verified_by': req.user.id, 'builder.reason': req.body.reason },
              $pull: { roles: '5d63c951ab1e86026c492d82' },
            },
            { new: true },
          )
          .select('builder');

        const renderedMail = await renderMail.renderTemplate(
          'builder_unverification',
          {
            name: req.body.name,
            email: req.body.email,
            reason: req.body.reason,
          },
          req.body.email,
        );

        if (renderedMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
        }

        return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Unverified Success !!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

userController.verifyAuthor = async (req, res, next) => {
  try {
    const { is_verified, _id } = req.body;
    const checkIf = await userSch.findOne({ _id: _id }).select('author');
    if (!checkIf) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No author information !!', null);
    }
    // if (checkIf.author.is_apply == false) {
    //   return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'User have not applied to verify !!', null);
    // }
    if (checkIf.author.is_verified == true && req.body.is_verified == true) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'Author has been already verified !!', null);
    }
    // if (checkIf.author.is_apply == true) {
    if (req.body.is_verified == true) {
      const apply = await userSch
        .findOneAndUpdate(
          { _id: _id },
          {
            $set: { 'author.is_verified': req.body.is_verified, 'author.is_apply': true, 'author.verified_at': Date.now(), 'author.verified_by': req.user.id, 'author.reason': req.body.reason },
            $push: { roles: '5d63c973ab1e86026c492d83' },
          },
          { new: true },
        )
        .select('author');

      const renderedMail = await renderMail.renderTemplate(
        'author_verification',
        {
          name: req.body.name,
          email: req.body.email,
          reason: req.body.reason,
        },
        req.body.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Verification Success !!', null);
    }
    if (req.body.is_verified == false) {
      const apply = await userSch
        .findOneAndUpdate(
          { _id: _id },
          {
            $set: { 'author.is_verified': req.body.is_verified, 'author.verified_at': Date.now(), 'author.verified_by': req.user.id, 'author.reason': req.body.reason },
            $pull: { roles: '5d63c973ab1e86026c492d83' },
          },
          { new: true },
        )
        .select('author');

      const renderedMail = await renderMail.renderTemplate(
        'author_unverification',
        {
          name: req.body.name,
          email: req.body.email,
          reason: req.body.reason,
        },
        req.body.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, apply, null, 'Unverified Success !!', null);
    }
    // }
  } catch (err) {
    next(err);
  }
};

userController.getAgentDetail = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.params.id).populate([
      { path: 'roles', select: 'role_title' },
      { path: 'agent.agency', select: 'title slug_url email website  logo address description phone mobile  is_approved is_active' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, { agent: data.agent, name: data.name, email: data.email }, null, 'Agent', null);
  } catch (err) {
    next(err);
  }
};
userController.getBuilderDetail = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.params.id).populate([{ path: 'builder.developer' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, { builder: data.builder, name: data.name, email: data.email }, null, 'Builder Status', null);
  } catch (err) {
    next(err);
  }
};

userController.getAuthorDetail = async (req, res, next) => {
  try {
    const data = await userSch.findById(req.params.id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, { author: data.author, name: data.name, email: data.email, social_link: data.social_link, image: data.image }, null, 'Author Status', null);
  } catch (err) {
    next(err);
  }
};

userController.getInfoForProperty = async (req, res, next) => {
  try {
    const data = await userSch
      .findById(req.user.id)
      .select('agent builder author email_verified is_active roles')
      .populate([{ path: 'agent.agency', select: 'title slug_url email phone address mobile description website logo' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'USer Status For Property', null);
  } catch (err) {
    next(err);
  }
};
module.exports = userController;

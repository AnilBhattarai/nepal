'use strict';
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');

const useragent = require('useragent');
const requestIp = require('request-ip');
const loginlogs = require('../modules/user/loginlogs/loginlogSchema');

const otherHelper = require('../helper/others.helper');
const { secretOrKey } = require('../config/keys');
const accessSch = require('../modules/role/accessSchema');
const modulesSch = require('../modules/role/moduleSchema');
const rolesSch = require('../modules/role/roleSchema');
const authMiddleware = {};
const mongoose = require('mongoose');

const isEmpty = require('../validation/isEmpty');

authMiddleware.authorization = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const userData = await jwt.verify(token, secretOrKey);
      req.user = userData;
      let passed = await loginlogs.findOne({ token, is_active: true });
      if (passed) {
        return next();
      } else {
        return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, null, 'Session Expired', null);
      }
    }
    return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, token, 'token not found', null);
  } catch (err) {
    return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, null, 'Token Expired', null);
    return next(err);
  }
};
authMiddleware.byPassAuthorization = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const userData = await jwt.verify(token, secretOrKey);

      let passed = await loginlogs.findOne({ token, is_active: true });
      if (passed) {
        req.user = userData;
        return next();
      } else {
        return next();
      }
    }
    return next();
  } catch (err) {
    return next();
  }
};
authMiddleware.authorizationForLogout = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const userData = await jwt.verify(token, secretOrKey);
      req.user = userData;
      return next();
    }
    return otherHelper.sendResponse(res, HttpStatus.FORBIDDEN, false, null, token, 'token not found', null);
  } catch (err) {
    return next(err);
  }
};

authMiddleware.authentication = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await rolesSch.find({ _id: { $in: user.roles } }, { _id: 1 });
    let path = req.baseUrl + req.route.path;
    if (path.substr(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1);
    }
    const method = req.method;
    const GetModuleFilter = {
      'path.server_routes.method': method,
      'path.server_routes.route': path,
    };
    const modules = await modulesSch.findOne(GetModuleFilter, { path: 1 });
    let moduleAccessTypeId = null;
    if (!isEmpty(modules) && !isEmpty(modules.path)) {
      for (let i = 0; i < modules.path.length; i++) {
        const routes = modules.path[i].server_routes;
        for (let j = 0; j < routes.length; j++) {
          if (routes[j].method === method && routes[j].route === path) {
            moduleAccessTypeId = modules.path[i]._id;
          }
        }
      }
    } else {
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Authorization Failed 3', null);
    }

    const moduleId = modules && modules._id;
    if (role && role.length && moduleId && moduleAccessTypeId) {
      for (let i = 0; i < role.length; i++) {
        const activeRole = role[i];
        const accessFilter = { role_id: activeRole._id, is_active: true, module_id: moduleId, access_type: moduleAccessTypeId };
        const access = await accessSch.findOne(accessFilter);
        if (access && access.access_type) {
          return next();
        }
      }
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Authorization Failed 1', null);
    } else {
      return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Authorization Failed 2', null);
    }
  } catch (err) {
    next(err);
  }
};
authMiddleware.getClientInfo = async (req, res, next) => {
  let info = {};

  let agent = useragent.parse(req.headers['user-agent']);
  // let another = useragent.fromJSON(JSON.stringify(agent));

  info.browser = agent.toAgent().toString();
  info.os = agent.os.toString();
  info.device = agent.device.toString();

  info.ip = requestIp.getClientIp(req);
  // on localhost you'll see 127.0.0.1 if you're using IPv4
  // or ::1, ::ffff:127.0.0.1 if you're using IPv6

  req.clinfo = info;
  return next();
};
module.exports = authMiddleware;

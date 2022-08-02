const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
var objectId = require('mongoose').Types.ObjectId;
const agencySch = require('./agencySchema');
const userSch = require('../user/userSchema');
const propertySch = require('../property/propertySchema');
const agencyConfig = require('./agencyConfig');
const emailHelper = require('./../../helper/email.helper');
const renderMail = require('./../template/templateController').internal;
const agencyController = {};
const internal = {};

agencyController.GetPublicAgencies = async (req, res, next) => {
  try {
    const size_default = 12;
    let page;
    let size;
    let searchQuery;
    let sortQuery;
    let selectQuery;
    let populate;
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

    searchQuery = {};

    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_key) {
      searchQuery = {
        key: { $regex: req.query.find_key, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_publish_from) {
      searchQuery = {
        publish_from: { $regex: req.query.find_publish_from, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_publish_to) {
      searchQuery = {
        publish_to: { $regex: req.query.find_publish_to, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_old === 'false') {
      sortQuery = {
        _id: -1,
      };
    }
    if (req.query.find_old === 'true') {
      sortQuery = {
        _id: 1,
      };
    }
    searchQuery = {
      is_active: true,
      is_approved: true,
      is_deleted: false,
      ...searchQuery,
    };
    populate = [
      // { path: 'address.state_id', select: 'name' },
      // { path: 'address.district_id', select: 'name' },
      // { path: 'address.city_id', select: 'name' },
      // { path: 'address.area_id', select: 'name' },
      { path: 'background_image', select: 'path' },
    ];

    selectQuery = 'title slug_url email phone address description logo premium added_at';
    let datas = await otherHelper.getquerySendResponse(agencySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    let totalagent = await userSch.aggregate([
      {
        $match: { 'agent.is_verified': true },
      },
      {
        $group: {
          _id: '$agent.agency',
          sum: { $sum: 1 },
        },
      },
    ]);

    if (totalagent && totalagent.length && datas && datas.data && datas.data.length) {
      for (let i = 0; i < datas.data.length; i++) {
        const d = totalagent.find((x) => x._id.toString() === datas.data[i]._id.toString());
        datas.data[i].agents_count = (d && d.sum) || 0;
      }
    }
    let totalProperty = await propertySch.aggregate([
      {
        $match: {
          is_deleted: false,
          is_active: true,
          is_verified: true,
          is_sold_out: false,
          'basic.property_purpose': { $ne: null },
        },
      },
      {
        $lookup: { from: 'enums', localField: 'basic.property_category', foreignField: '_id', as: 'category' },
      },
      {
        $project: { agency: '$agency_id', category: '$category.title' },
      },
      {
        $unwind: '$category',
      },
      {
        $group: { _id: { category: '$category', agency: '$agency' }, sum: { $sum: 1 } },
      },
      {
        $project: { agency: '$_id.agency', data: { cat: '$_id.category', sum: '$sum' } },
      },
      {
        $group: { _id: '$agency', data: { $push: '$data' } },
      },
      {
        $lookup: { from: 'agencies', localField: '_id', foreignField: '_id', as: 'agency' },
      },
      {
        $unwind: '$agency',
      },
      {
        $project: {
          data: '$data',
          agency_id: '$agency._id',
        },
      },
    ]);

    let totalPropertyByType = await propertySch.aggregate([
      {
        $match: {
          is_sold_out: false,
          is_deleted: false,
          is_active: true,
          is_verified: true,
          'basic.property_purpose': { $ne: null },
        },
      },
      {
        $lookup: { from: 'enums', localField: 'basic.property_purpose', foreignField: '_id', as: 'category' },
      },
      {
        $project: { agency: '$agency_id', category: '$category.title' },
      },
      {
        $unwind: '$category',
      },
      {
        $group: { _id: { category: '$category', agency: '$agency' }, sum: { $sum: 1 } },
      },
      {
        $project: { agency: '$_id.agency', data: { cat: '$_id.category', sum: '$sum' } },
      },
      {
        $group: { _id: '$agency', data: { $push: '$data' } },
      },
      {
        $lookup: { from: 'agencies', localField: '_id', foreignField: '_id', as: 'agency' },
      },
      {
        $unwind: '$agency',
      },
      {
        $project: {
          data: '$data',
          agency_id: '$agency._id',
        },
      },
    ]);
    let totalPropertyNumber = await propertySch.aggregate([
      {
        $match: {
          is_sold_out: false,
          is_deleted: false,
          is_active: true,
          is_verified: true,
          agency_id: { $ne: null },
          'basic.property_purpose': { $ne: null },
        },
      },
      {
        $group: { _id: '$agency_id', sum: { $sum: 1 } },
      },
    ]);
    if (totalPropertyNumber && totalPropertyNumber.length && datas.data && datas.data.length) {
      for (let i = 0; i < datas.data.length; i++) {
        const e = totalPropertyNumber.find((x) => x._id.toString() === datas.data[i]._id.toString());
        datas.data[i].total_Property = (e && e.sum) || 0;
      }
    }

    if (totalProperty && totalProperty.length && datas && datas.data && datas.data.length) {
      for (let i = 0; i < datas.data.length; i++) {
        const d = totalProperty.find((x) => x._id.toString() === datas.data[i]._id.toString());
        datas.data[i].product_count_by_purpose = (d && d.data) || 0;
      }
    }

    if (totalPropertyByType && totalPropertyByType.length && datas && datas.data && datas.data.length) {
      for (let i = 0; i < datas.data.length; i++) {
        const d = totalPropertyByType.find((x) => x._id.toString() === datas.data[i]._id.toString());
        datas.data[i].product_count_by_type = (d && d.data) || 0;
      }
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, agencyConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
agencyController.getAgenciesList = async (req, res, next) => {
  try {
    const alllist = await agencySch.find({ is_active: true }).populate([
      // { path: 'address.state_id', select: 'name' },
      // { path: 'address.district_id', select: 'name' },
      // { path: 'address.city_id', select: 'name' },
      // { path: 'address.area_id', select: 'name' },
      { path: 'background_image', select: 'path' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, alllist, null, 'all list get sucessfull', null);
  } catch (err) {
    next(err);
  }
};
agencyController.GetAgencies = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let sortQuery = '-_id';
    let selectQuery;
    let populate;
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

    searchQuery = {};

    if (req.query.find_name) {
      searchQuery = {
        title: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_is_verified) {
      searchQuery = {
        is_approved: req.query.find_is_verified,
        ...searchQuery,
      };
    }
    if (req.query.find_is_active) {
      searchQuery = {
        is_active: req.query.find_is_active,
        ...searchQuery,
      };
    }
    if (req.query.is_approved) {
      searchQuery = {
        is_approved: req.query.is_approved,
        ...searchQuery,
      };
    }

    if (req.query.find_key) {
      searchQuery = {
        key: { $regex: req.query.find_key, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_publish_from) {
      searchQuery = {
        publish_from: { $regex: req.query.find_publish_from, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_publish_to) {
      searchQuery = {
        publish_to: { $regex: req.query.find_publish_to, $options: 'i' },
        ...searchQuery,
      };
    }
    populate = [{ path: 'background_image', select: 'path' }];

    let datas = await otherHelper.getquerySendResponse(agencySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    // let alldata = await agencySch.find({is_approved:true});
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, agencyConfig.gets, page, size, datas.totaldata);

    // return otherHelper.paginationSendResponse(res, httpStatus.OK, true, (datas.data , alldata), agencyConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
agencyController.GetAgenciesOfUser = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10000, false);
    searchQuery = { ...searchQuery, is_active: true, $or: [{ added_by: req.user.id }, { is_approved: true }] };
    selectQuery = 'title slug_url email website logo address description phone mobile is_approved is_active';
    let allData = await agencySch.find(searchQuery, selectQuery).populate([
      // { path: 'address.state_id', select: 'name' },
      // { path: 'address.district_id', select: 'name' },
      // { path: 'address.city_id', select: 'name' },
      // { path: 'address.area_id', select: 'name' },
      { path: 'background_image', select: 'path' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, allData, null, 'agency', null);
  } catch (err) {
    next(err);
  }
};
agencyController.SaveAgency = async (req, res, next) => {
  try {
    const agencies = req.body;
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
    }
    if (agencies && agencies._id) {
      if (req.file) {
        agencies.logo = req.file;
      }
      const update = await agencySch.findByIdAndUpdate(agencies._id, { $set: agencies }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, agencyConfig.save, null);
    } else {
      agencies.logo = req.file;
      agencies.added_by = req.user.id;
      const newAgency = new agencySch(agencies);
      const agenciesSave = await newAgency.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, agenciesSave, null, agencyConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
agencyController.GetAgencyDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agencies = await agencySch.findOne({ _id: id, is_deleted: false }).populate([{ path: 'background_image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, agencies, null, agencyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
agencyController.GetAgencyDetailForPublic = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agencies = await agencySch.findOne({ _id: id, is_deleted: false, is_active: true, is_approved: true }).populate([{ path: 'background_image', select: 'path' }]);
    const agents = await userSch.find({ 'agent.agency': id, 'agent.is_verified': true }, { name: 1, email: 1, image: 1, mobile_no: 1, _id: 0 });
    const agents_length = await userSch.find({ 'agent.agency': id, 'agent.is_verified': true }, { name: 1, email: 1, image: 1, mobile_no: 1, _id: 0 }).countDocuments();
    let soldProperties = await propertySch.countDocuments({ is_sold_out: true, is_deleted: false, agency_id: agencies._id });
    let rent = await propertySch.countDocuments({ is_sold_out: true, is_deleted: false, agency_id: agencies._id });

    let propertyCount = await propertySch.aggregate([
      {
        $match: {
          is_sold_out: false,
          is_deleted: false,
          is_active: true,
          is_verified: true,
          agency_id: objectId(agencies._id),
          'basic.property_purpose': { $ne: null },
        },
      },
      {
        $group: {
          _id: '$basic.property_purpose',
          sum: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'enums',
          localField: '_id',
          foreignField: '_id',
          as: 'purpose',
        },
      },
      { $unwind: { path: '$purpose' } },
      {
        $project: {
          _id: 0,
          total: '$sum',
          type: '$purpose.title',
        },
      },
    ]);
    propertyCount.push({ total: soldProperties, type: 'Sold' });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { agencies, agents, agents_length, propertyCount }, null, agencyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
agencyController.GetAgencyByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const agencies = await agencySch.findOne({ key, is_deleted: false }).populate([
      // { path: 'address.state_id', select: 'name' },
      // { path: 'address.district_id', select: 'name' },
      // { path: 'address.city_id', select: 'name' },
      // { path: 'address.area_id', select: 'name' },
      { path: 'background_image', select: 'path' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, agencies, null, agencyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
agencyController.DeleteAgency = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await agencySch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'agency delete success!!', null);
  } catch (err) {
    next(err);
  }
};

agencyController.verifyAgency = async (req, res, next) => {
  try {
    const { is_approved, agency_id } = req.body;

    const checkIf = await agencySch.findOne({ _id: agency_id });
    if (!checkIf) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No Agent information !!', null);
    }

    const user = await agencySch.findOne({ _id: agency_id }).select('added_by');

    const email = await userSch.findOne({ _id: user.added_by }).select('email name');

    if (is_approved == true) {
      const agency = await agencySch.findOneAndUpdate(
        { _id: agency_id },
        {
          $set: { is_approved: is_approved, approved_at: Date.now(), approved_by: req.user.id },
        },
        { new: true },
      );

      const renderedMail = await renderMail.renderTemplate(
        'verify_agency',
        {
          name: email.name,
          email: email.email,
        },
        email.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, agency, null, 'Verification Success !!', null);
    }
    if (is_approved == false) {
      const agency = await agencySch.findOneAndUpdate(
        { _id: agency_id },
        {
          $set: { is_approved: is_approved, approved_at: Date.now(), approved_by: req.user.id },
        },
        { new: true },
      );

      const renderedMail = await renderMail.renderTemplate(
        'unverify_agency',
        {
          name: email.name,
          email: email.email,
        },
        email.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);

        return otherHelper.sendResponse(res, httpStatus.OK, true, agency, null, 'Unverification Success !!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

agencyController.getAgentOfagency = async (req, res, next) => {
  try {
    let agency = req.params.id;
    let data = await userSch.find({ 'agent.agency': objectId(agency), 'agent.is_verified': true }, { name: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'agent of agency get successfull', null);
  } catch (err) {
    next(err);
  }
};

module.exports = agencyController;

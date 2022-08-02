const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const propertySch = require('./propertySchema');
const offerSch = require('./offerSchema');
const usrSch = require('../user/userSchema');
const propertyTypSch = require('./propertyTypSchema');
const propertyConfig = require('./propertyConfig');
const enumSch = require('../enum/enumSchema');
const leadSch = require('../lead/leadSchema');
const { areaSch, disctrictSch, stateSch, vdcMunicipalitySch } = require('../staticData/nepalLocationSchema');
const propertyController = {};
const internal = {};

propertyController.GetProperty = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery = { is_deleted: false };
    let sortQuery = '-_id';
    if (req.query.find_is_project) {
      searchQuery = { is_project: req.query.find_is_project, ...searchQuery };
    } else {
      searchQuery = { is_project: false, ...searchQuery };
    }
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
    if (req.query.find_date) {
      const date_old = new Date(req.query.find_date);
      const date_one = new Date(date_old.getTime() + 86400000);
      searchQuery = {
        added_on: { $gte: date_old, $lte: date_one },
        ...searchQuery,
      };
    }
    if (req.query.find_project_id) {
      searchQuery = { project_id: req.query.find_project_id, ...searchQuery };
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
    if (!req.user.roles.includes('5bf7ae3694db051f5486f845')) {
      searchQuery = { $or: [{ added_by: req.user.id }, { agent_id: req.user.id }], ...searchQuery };
    }

    if (req.query.find_title) {
      searchQuery = {
        'basic.title': { $regex: req.query.find_title, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_agency_id) {
      searchQuery = {
        agency_id: req.query.find_agency_id,
        ...searchQuery,
      };
    }
    if (req.query.find_property_id) {
      searchQuery = {
        property_id: req.query.find_property_id,
        ...searchQuery,
      };
    }
    if (req.query.find_agent_id) {
      searchQuery = {
        agent_id: req.query.find_agent_id,
        ...searchQuery,
      };
    }
    if (req.query.find_is_soldout) {
      searchQuery = {
        is_sold_out: req.query.find_is_soldout,
        ...searchQuery,
      };
    }
    if (req.query.find_is_negotiable) {
      searchQuery = {
        is_negotiable: req.query.find_is_negotiable,
        ...searchQuery,
      };
    }
    if (req.query.find_is_premium) {
      searchQuery = {
        is_premium: req.query.find_is_premium,
        ...searchQuery,
      };
    }
    if (req.query.find_is_featured) {
      searchQuery = {
        is_featured: req.query.find_is_featured,
        ...searchQuery,
      };
    }
    if (req.query.find_is_exclusive) {
      searchQuery = {
        is_exclusive: req.query.find_is_exclusive,
        ...searchQuery,
      };
    }
    if (req.query.find_is_verified) {
      searchQuery = {
        is_verified: req.query.find_is_verified,
        ...searchQuery,
      };
    }
    if (req.query.find_is_active) {
      searchQuery = {
        is_active: req.query.find_is_active,
        ...searchQuery,
      };
    }
    if (req.query.find_property_purpose) {
      searchQuery = {
        'basic.property_purpose': req.query.find_property_purpose,
        ...searchQuery,
      };
    }
    if (req.query.find_property_type) {
      searchQuery = {
        'basic.property_type': req.query.find_property_type,
        ...searchQuery,
      };
    }
    if (req.query.find_property_category) {
      searchQuery = {
        'basic.property_category': req.query.find_property_category,
        ...searchQuery,
      };
    }
    if (req.query.find_state_id) {
      searchQuery = {
        'address.state_id': objectId(req.query.find_state_id),
        ...searchQuery,
      };
    }
    if (req.query.find_district_id) {
      searchQuery = {
        'address.district_id ': objectId(req.query.find_district_id),
        ...searchQuery,
      };
    }
    if (req.query.find_vdc_id) {
      searchQuery = {
        'address.city_id': objectId(req.query.find_vdc_id),
        ...searchQuery,
      };
    }
    if (req.query.find_area_id) {
      searchQuery = {
        'address.area_id': objectId(req.query.find_area_id),
        ...searchQuery,
      };
    }
    const selectQuery =
      'is_project prefix project_id view_count_user view_count_guest basic.title slug_url property_id building.built_year building.built_month building.total_floor price.value price.is_price_on_call address.house_no added_by added_at location_property.total_area building.no_of.bedroom building.no_of.bathroom building.total_floor location_property.road_access_value is_verified is_negotiable is_premium is_featured is_active is_sold_out is_published';
    const populate = [
      { path: 'basic.property_category', select: { title: 1, _id: 0 } },
      { path: 'basic.property_purpose', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: { name: 1, _id: 0 } },
      { path: 'address.district_id', select: { name: 1, _id: 0 } },
      { path: 'address.city_id', select: { name: 1, _id: 0 } },
      { path: 'address.area_id', select: { name: 1, _id: 0 } },
      {
        path: 'location_property.road_access_length_unit',
        select: { title: 1, _id: 0 },
      },
      {
        path: 'location_property.total_area_unit',
        select: { title: 1, _id: 0 },
      },
      { path: 'location_property.property_face', select: { title: 1, _id: 0 } },
      {
        path: 'location_property.road_access_road_type',
        select: { title: 1, _id: 0 },
      },
      { path: 'agency_id', select: 'title' },
      { path: 'agent_id', select: 'name' },
      { path: 'verified_by', select: 'name' },
      { path: 'media.images.id', select: { filename: 1, path: 1 } },
    ];
    let datas = await otherHelper.getquerySendResponse(propertySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    let fSearch = { is_deleted: false };
    if (!req.user.roles.includes('5bf7ae3694db051f5486f845')) {
      fSearch = { $or: [{ added_by: req.user.id }, { agent_id: req.user.id }], ...fSearch };
      if (req.query.find_is_project) {
        fSearch = { is_project: req.query.find_is_project, ...fSearch };
      } else {
        fSearch = { is_project: false, ...fSearch };
      }
    }
    const property_purpose = await propertySch.aggregate([
      { $match: fSearch },
      { $project: { property_purpose: '$basic.property_purpose' } },
      {
        $group: { _id: '$property_purpose', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'enums',
          localField: '_id',
          foreignField: '_id',
          as: 'purpose',
        },
      },
      { $project: { purpose: '$purpose.title', amt: '$amt' } },
      { $unwind: '$purpose' },
    ]);
    const property_type = await propertySch.aggregate([
      {
        $match: fSearch,
      },
      { $project: { property_type: '$basic.property_type' } },
      { $unwind: '$property_type' },
      {
        $group: { _id: '$property_type', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'enums',
          localField: '_id',
          foreignField: '_id',
          as: 'type',
        },
      },
      { $project: { type: '$type.title', amt: '$amt' } },
      { $unwind: '$type' },
    ]);
    const pending_property = await propertySch.count({ ...fSearch, is_verified: false, is_active: true });
    const active_property = await propertySch.count({ ...fSearch, is_verified: true, is_active: true });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas && datas.data ? datas.data : [], { property_purpose, property_type, pending_property, active_property }, page, size, datas && datas.totaldata ? datas.totaldata : 0);
  } catch (err) {
    next(err);
  }
};
propertyController.SaveProperty = async (req, res, next) => {
  try {
    const properties = req.body;
    if (properties.building.furnishing == '') delete properties.building.furnishing;
    if (properties.location_property.road_access_road_type == '') delete properties.location_property.road_access_road_type;
    if (properties.location_property.property_face == '') delete properties.location_property.property_face;
    if (properties.slug_url) {
      let filter = { slug_url: properties.slug_url };
      if (properties._id) {
        filter = { ...filter, _id: { $ne: properties._id } };
      }
      let ifexist = await propertySch.findOne(filter);
      if (ifexist) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { slug_url: 'slug_url already exist' }, 'slug_url already exist', null);
      }
    }
    if (properties.is_by_agency) {
      if (!properties.agency_id) {
        const userInfo = await usrSch.findById(req.user.id);
        if (userInfo && userInfo.agent && userInfo.agent.agency) {
          properties.agency_id = userInfo.agent.agency;
        }
      }
    }
    if (properties.is_project) {
      if (properties.developer_id) {
      } else {
        const userInfo = await usrSch.findById(req.user.id);
        if (userInfo && userInfo.builder && userInfo.builder.developer) {
          properties.developer_id = userInfo.builder.developer;
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, null, 'You are not allowed to post project, Please Apply for Builder First', null);
        }
      }
    }
    if (properties.agency_id == '') {
      delete properties.agency_id;
    }
    if (properties.basic.property_ownership == '') {
      delete properties.basic.property_ownership;
    }
    if (properties.agent_id == '') {
      delete properties.agent_id;
    }
    if (properties.project_status == '') {
      delete properties.project_status;
    }
    if (properties && properties._id) {
      // delete properties.slug_url;
      if (properties.is_verified) {
        const d = await propertySch.findById(properties._id);
        if (d.is_verified) {
        } else {
          properties.verified_by = req.user.id;
          properties.verified_at = new Date();
        }
      }
      const update = await propertySch.findByIdAndUpdate(properties._id, { $set: properties }, { new: true });
      const response = await propertySch
        .findOne({
          _id: properties._id,
          is_deleted: false,
        })
        .populate([{ path: 'media.images.id' }, { path: 'project_floor_plan.image' }, { path: 'project_payment_plan.image' }, { path: 'project_property_type.image' }]);
      return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, propertyConfig.save, null);
    } else {
      properties.added_by = req.user.id;
      properties.owened_by = req.user.id;
      if (!properties.slug_url) {
        properties.slug_url = otherHelper.slugify(properties.basic.title.trim());
      }
      const newProperty = new propertySch(properties);
      const propertiesSave = await newProperty.save();
      const response = await propertySch
        .findOne({
          _id: propertiesSave._id,
          is_deleted: false,
        })
        .populate([{ path: 'media.images.id' }, { path: 'project_floor_plan.image' }, { path: 'project_payment_plan.image' }, { path: 'project_property_type.image' }]);
      return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, propertyConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

propertyController.GetPropertyDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const properties = await propertySch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate([{ path: 'media.images.id' }, { path: 'project_floor_plan.image' }, { path: 'project_payment_plan.image' }, { path: 'project_property_type.image' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, properties, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};

propertyController.DeleteProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await propertySch.findOneAndUpdate(
      { _id: id, is_deleted: false },
      {
        $set: {
          is_deleted: true,
          deleted_by: req.user.id,
          deleted_at: new Date(),
        },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'property delete success!!', null);
  } catch (err) {
    next(err);
  }
};
propertyController.GetPropertyOfAgency = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10000, false);
    if (req.query.agency_id) {
      searchQuery = {
        agency_id: req.query.agency_id,
        ...searchQuery,
      };
      req.query.is_project = false;
    }
    populate = [
      { path: 'basic.property_category', select: { title: 1, _id: 0 } },
      { path: 'basic.property_purpose', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: { name: 1, _id: 0 } },
      { path: 'address.district_id', select: { name: 1, _id: 0 } },
      { path: 'address.city_id', select: { name: 1, _id: 0 } },
      { path: 'address.area_id', select: { name: 1, _id: 0 } },
      { path: 'price.label' },
      {
        path: 'location_property.road_access_length_unit',
        select: { title: 1, _id: 0 },
      },
      {
        path: 'location_property.total_area_unit',
        select: { title: 1, _id: 0 },
      },
      { path: 'location_property.property_face', select: { title: 1, _id: 0 } },
      {
        path: 'location_property.road_access_road_type',
        select: { title: 1, _id: 0 },
      },
      { path: 'agency_id', select: {} },
      { path: 'media.images.id', select: { filename: 1, path: 1 } },
    ];

    let datas = await otherHelper.getquerySendResponse(propertySch, page, '4', sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.sendResponse(res, httpStatus.OK, true, datas, null, 'agency get successfull', null);
  } catch (err) {
    next(err);
  }
};
propertyController.GetPublicProperty = async (req, res, next) => {
  try {
    const size_default = 8;
    let page;
    let size;
    let searchQuery;
    let message = '';
    let sortQuery = { _id: -1 };
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
      let sortby = req.query.sort;
      if (sortby === 'Newest') {
        sortQuery = { _id: -1 };
      } else if (sortby === 'Oldest') {
        sortQuery = { _id: 1 };
      } else if (sortby == 1) {
        sortQuery = { _id: -1 };
      } else if (sortby == 2) {
        sortQuery = { 'price.value': -1 };
      } else if (sortby == 3) {
        sortQuery = { 'price.value': 1 };
      } else {
        sortQuery = { property_id: -1 };
      }
    }

    searchQuery = { is_deleted: false, is_verified: true, is_active: true };

    if (req.query.developer_id) {
      searchQuery = {
        developer_id: req.query.developer_id,
        ...searchQuery,
      };
      req.query.is_project = true;
    }
    if (req.query.agency_id) {
      searchQuery = {
        agency_id: req.query.agency_id,
        ...searchQuery,
      };
      req.query.is_project = false;
    }
    if (req.query.is_project) {
      searchQuery = {
        is_project: req.query.is_project,
        ...searchQuery,
      };
    } else {
      searchQuery = {
        is_project: false,
        ...searchQuery,
      };
    }
    if (req.query.find_property_id) {
      searchQuery = {
        property_id: { $regex: req.query.find_property_id, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_title) {
      searchQuery = {
        title: { $regex: req.query.find_title, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_is_negotiable) {
      searchQuery = {
        is_negotiable: req.query.find_is_negotiable,
        ...searchQuery,
      };
    }
    if (req.query.find_is_premium) {
      searchQuery = {
        is_premium: req.query.find_is_premium,
        ...searchQuery,
      };
    }
    if (req.query.find_is_featured) {
      searchQuery = {
        is_featured: req.query.find_is_featured,
        ...searchQuery,
      };
    }
    if (req.query.find_property_type) {
      searchQuery = {
        'basic.property_type': objectId(req.query.find_property_type),
        ...searchQuery,
      };
      const title = await enumSch.findById(req.query.find_property_type).select('title');
      if (title && title.title) {
        message += title.title + ' ';
      }
    }
    if (req.query.find_property_category) {
      searchQuery = {
        'basic.property_category': objectId(req.query.find_property_category),
        ...searchQuery,
      };
      const title = await enumSch.findById(req.query.find_property_category).select('title');
      if (title && title.title) {
        message += title.title + ' ';
      } else {
        if (req.query.is_project) message += 'Projects ';
        else message += 'Properties ';
      }
    }
    if (req.query.find_property_purpose) {
      searchQuery = {
        'basic.property_purpose': objectId(req.query.find_property_purpose),
        ...searchQuery,
      };
      const title = await enumSch.findById(req.query.find_property_purpose).select('title');
      if (title && title.title) {
        message += 'for <b>' + title.title + '</b> ';
      }
    }
    if (req.query.find_property_face) {
      searchQuery = {
        'location_property.property_face': objectId(req.query.find_property_face),
        ...searchQuery,
      };
      const title = await enumSch.findById(req.query.find_property_face).select('title');
      if (title && title.title) {
        message += 'faced to <b>' + title.title + '</b> ';
      }
    }
    if (req.query.find_road_access_road_type) {
      searchQuery = {
        'location_property.road_access_road_type': objectId(req.query.find_road_access_road_type),
        ...searchQuery,
      };
    }
    if (req.query.find_state_id) {
      searchQuery = {
        'address.state_id': objectId(req.query.find_state_id),
        ...searchQuery,
      };
      const data = await stateSch.findById(req.query.find_state_id).select('name');
      if (data && data.name) message += 'at <b>' + data.name + '</b> ';
    }
    if (req.query.find_district_id) {
      searchQuery = {
        'address.district_id': objectId(req.query.find_district_id),
        ...searchQuery,
      };
      const data = await disctrictSch.findById(req.query.find_district_id).select('name');
      if (data && data.name) message += 'at ' + data.name + '<i>(District)</> ';
    }
    if (req.query.find_vdc_id) {
      searchQuery = {
        'address.city_id': objectId(req.query.find_vdc_id),
        ...searchQuery,
      };
      const data = await vdcMunicipalitySch.findById(req.query.find_vdc_id).select('name');
      if (data && data.name) message += 'at ' + data.name + '<i>(City)</i> ';
    }
    if (req.query.find_area_id) {
      searchQuery = {
        'address.area_id': objectId(req.query.find_area_id),
        ...searchQuery,
      };
      const data = await areaSch.findById(req.query.find_area_id).select('name');
      if (data && data.name) message += 'at ' + data.name + '<i>(Area)</i> ';
    }
    if (req.query.find_selected_price) {
      const filter = req.query.find_selected_price;
      let price_search = {};
      if (filter == 1) {
        price_search = { $lte: 50000 };

        message += 'price upto 50 K ';
      }
      if (filter == 2) {
        price_search = { $gte: 50000, $lte: 500000 };
        message += 'price from 50 K to 5 Lakh';
      }
      if (filter == 3) {
        price_search = { $gte: 500000, $lte: 5000000 };
        message += 'price from 5 Lakh to 50 Lakh';
      }
      if (filter == 4) {
        price_search = { $gte: 5000000, $lte: 30000000 };
        message += 'price from 50 Lakh to 3 Cr.';
      }
      if (filter == 5) {
        price_search = { $gte: 30000000 };
        message += 'price min. 3 Cr.';
      }
      searchQuery = {
        'price.value': price_search,
        ...searchQuery,
      };
    }
    const selectQuery =
      'project_property_type view_count_user view_count_guest property_purpose agency_id is_project prefix project_id basic.title slug_url property_id building.built_year building.built_month building.total_floor price.is_price_on_call price.value price.label address.house_no added_by added_at location_property.total_area building.no_of.bedroom building.no_of.bathroom building.total_floor location_property.road_access_value  is_negotiable is_premium is_featured';
    const populate = [
      { path: 'added_by', select: 'name image' },
      { path: 'added_by.image', select: 'path' },
      { path: 'agency_id', select: '_id title slug_url logo' },
      { path: 'agency_id.logo', select: 'path' },
      { path: 'basic.property_category', select: { title: 1, _id: 0 } },
      { path: 'basic.property_purpose', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: { name: 1, _id: 0 } },
      { path: 'address.district_id', select: { name: 1, _id: 0 } },
      { path: 'address.city_id', select: { name: 1, _id: 0 } },
      { path: 'address.area_id', select: { name: 1, _id: 0 } },
      { path: 'price.label' },
      {
        path: 'location_property.road_access_length_unit',
        select: { title: 1, _id: 0 },
      },
      {
        path: 'location_property.total_area_unit',
        select: { title: 1, _id: 0 },
      },
      { path: 'location_property.property_face', select: { title: 1, _id: 0 } },
      {
        path: 'location_property.road_access_road_type',
        select: { title: 1, _id: 0 },
      },
      { path: 'media.images.id', select: { filename: 1, path: 1 } },
    ];
    if (message === '') {
      if (req.query.is_project) message = `<p>All Projects<p>`;
      else message = `<p>All Properties<p>`;
    } else {
      message = `<p>${message}</p>`;
    }
    let datas = await otherHelper.getquerySendResponse(propertySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, (datas && datas.data) || [], message, page, size, (datas && datas.totaldata) || 0);
  } catch (err) {
    next(err);
  }
};

propertyController.GetPublicProjects = async (req, res, next) => {
  try {
    const size_default = 12;
    let page;
    let size;
    let searchQuery;
    let message = '';
    let sortQuery = { _id: -1 };
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
      let sortby = req.query.sort;
      if (sortby == 1) {
        sortQuery = { _id: -1 };
      } else if (sortby == 2) {
        sortQuery = { 'price.value': -1 };
      } else if (sortby == 3) {
        sortQuery = { 'price.value': 1 };
      } else {
        sortQuery = { property_id: -1 };
      }
    }

    searchQuery = { is_deleted: false, is_verified: true, is_active: true, is_project: true };
    const selectQuery =
      'project_property_type range unit_count is_project prefix project_id basic.title slug_url property_id building.built_year building.built_month building.total_floor price.value address.house_no added_by added_at location_property.total_area building.no_of.bedroom building.no_of.bathroom building.total_floor location_property.road_access_value  is_negotiable is_premium is_featured';
    const populate = [
      { path: 'address.city_id', select: { name: 1, _id: 0 } },
      { path: 'address.area_id', select: { name: 1, _id: 0 } },

      { path: 'developer_id', select: {} },
      { path: 'media.images.id', select: { filename: 1, path: 1 } },
    ];
    if (message === '') {
      message = `<p>All Properties<p>`;
    } else {
      message = `<p>${message}</p>`;
    }
    let datas = await otherHelper.getquerySendResponse(propertySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, message, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};

/**
 *
 *
 */

propertyController.SavePropertyType = async (req, res, next) => {
  try {
    const propertiesType = req.body;
    const isAvailable = await propertyTypSch.find({
      property_type: propertiesType.property_type,
      is_deleted: false,
    });
    if (isAvailable && isAvailable.length) {
      const filter = {
        property_type: propertiesType.property_type,
        is_deleted: false,
      };
      const updateData = {
        property_title: propertiesType.property_title,
        is_active: propertiesType.is_active,
        properties: propertiesType.properties,
        is_deleted: propertiesType.is_deleted ? propertiesType.is_deleted : false,
        is_project: propertiesType.is_project ? propertiesType.is_project : false,
      };
      const update = await propertyTypSch.findOneAndUpdate(filter, updateData, {
        new: true,
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, propertyConfig.updated, null);
    } else {
      propertiesType.added_by = req.user.id;
      propertiesType.is_deleted = propertiesType.is_deleted ? propertiesType.is_deleted : false;
      const newPropertyType = new propertyTypSch(propertiesType);
      const propertiesTypeSave = await newPropertyType.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, propertiesTypeSave, null, propertyConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
propertyController.getAllPropertiesByType = async (req, res, next) => {
  try {
    const size_default = 10;
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

    //     populate=[
    //    { path: 'properties', select:{'basic.title':1,_id:0} ,
    //      populate:[
    //         { path: 'address.area_id', select: { name: 1, _id: 0 } },
    //         { path: 'address.city_id', select: { name: 1, _id: 0 } },
    //         { path: 'media.images', select: { filename: 1, path: 1 } }
    // ]
    //  }];

    searchQuery = {
      is_deleted: false,
    };
    if (req.query.find_title) {
      searchQuery = {
        title: { $regex: req.query.find_title, $options: 'i' },
        ...searchQuery,
      };
    }
    // if (req.query.is_project == 'true') {
    //   searchQuery = { ...searchQuery, is_project: true };
    // } else {
    //   searchQuery = { ...searchQuery, is_project: { $ne: true } };
    // }
    let properties = await otherHelper.getquerySendResponse(propertyTypSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, properties.data, propertyConfig.get, page, size, properties.totaldata);
    //return otherHelper.sendResponse(res, httpStatus.OK, true, properties.data, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
propertyController.getPropertiesByPropType = async (req, res, next) => {
  try {
    const property_type = req.params.property_type;
    const searchQuery = { property_type: property_type };
    const populate = [
      {
        path: 'properties.id',
        select: {
          'basic.title': 1,
          'basic.purporty_purpose': 1,
          slug_url: 1,
          property_id: 1,
          project_id: 1,
          'price.value': 1,
          unit_count: 1,
          developer_id: 1,
          'price.is_price_on_call': 1,
          project_property_type: 1,
          _id: 1,
          range: 1,
        },
        populate: [
          { path: 'basic.property_purpose', select: `title` },
          { path: 'address.area_id', select: { name: 1, _id: 0 } },
          { path: 'address.city_id', select: { name: 1, _id: 0 } },
          { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
          { path: 'price.currency', select: { title: 1, _id: 0 } },
          { path: 'price.label', select: { title: 1, _id: 0 } },
          { path: 'project_property_type.image', select: { path: 1, _id: 0 } },
          { path: 'basic.property_purpose', select: 'title' },
          { path: 'agency_id', select: '_id title slug_url' },
          { path: 'developer_id', select: 'name' },
        ],
      },
    ];
    // if (req.query.is_project == 'true') {
    //   searchQuery = { ...searchQuery, is_project: true };
    // } else {
    //   searchQuery = { ...searchQuery, is_project: { $ne: true } };
    // }
    let properties = await propertyTypSch.findOne(searchQuery).populate(populate);
    // otherHelper.getquerySendResponse(propertyTypSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.sendResponse(res, httpStatus.OK, true, properties, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
propertyController.getPropertiesByPropTypeHTMLNew = async (req, res, next) => {
  try {
    const property_type = req.params.property_type;
    const searchQuery = { property_type: property_type };
    const populate = [
      {
        path: 'properties.id',
        select: {
          'basic.title': 1,
          slug_url: 1,
          property_id: 1,
          'price.value': 1,
          'price.is_price_on_call': 1,
          _id: 1,
        },
        populate: [
          { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
          { path: 'price.currency', select: { title: 1, _id: 0 } },
          { path: 'price.label', select: { title: 1, _id: 0 } },
        ],
      },
    ];
    // if (req.query.is_project == 'true') {
    //   searchQuery = { ...searchQuery, is_project: true };
    // } else {
    //   searchQuery = { ...searchQuery, is_project: { $ne: true } };
    // }
    let properties = await propertyTypSch.findOne(searchQuery).populate(populate);
    const p = properties.properties;
    let property = '';
    for (let i = 0; i < p.length; i++) {
      property += `<div class="item">
      <div style="height: 100%;">
        <div style="position: relative; display: block; overflow: hidden; height: 152px">
          <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}">
            <img
              class="image"
              src="https://www.nepalhomes.com/public/400-300/media/${p[i].id.media.images[0].id.filename}"
              alt="${p[i].id.basic.title}"
            />
          </a>
        </div>
        <div style="padding: 10px">
          <h3 class="heading">
            <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}"
              >${p[i].id.basic.title}</a
            >
          </h3>
          <p style="font-size: 14px; font-weight: bold; margin-top: 4px">
            ${p[i].id.price.value ? 'Rs.' + Intl.NumberFormat('en-IN').format(p[i].id.price.value) : 'Price on Call'}
          </p>
          <p style="font-size: 12px; color: #777; margin-top: 4px">
          ${p[i].id.price.value && p[i].id.price.label.title ? p[i].id.price.label.title : ''}
          </p>
        </div>
      </div>
    </div>
`;
    }
    let html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-150840081-2"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "UA-150840081-2");
        </script>
        <title>Hot Properties</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          .wrapper {
            overflow: hidden;
            width: 100%;
            position: relative;
          }
          .grid {
            display: flex;
            margin: 0 -4px;
            transition: transform 0.5s cubic-bezier(0, 1.1, 0.26, 1.08);
          }
          .item {flex: 0 0 246px ; padding: 0 10px ; 
          }
          .heading {
            color: #616161;
            font-size: 16px;
            font-weight: normal;
            line-height: 1.4;
            margin-top:12px;
          }
          .heading:hover {
            color: #0291dd;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          img.image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
    
          .arrow {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ddd;
            border-radius: 2px;
          }
          .arrow.left {
            margin-right: 10px;
          }
          .left-arrow,
          .right-arrow {
            position: absolute;
            right: 2px;
            top: 18px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            opacity: 0;
          }
          .left-arrow {
            right: 44px;
          }
    
          @media screen and (max-width: 767px) {
            .wrapper {
              width: 100%;
            }
            .right-arrow,
            .left-arrow,
            .arrow {
              display: none !important;
            }
            .grid {
              display: block;
            }      
	.heading {
        width: 99%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      	}
          }
        </style>
    
        <script type="text/javascript">
          function functionRight() {
            document.getElementById('grid').style.transform = 'translateX(-804px)';
            // document.getElementById('rightArrow').style.opacity = '0.4';
            document.getElementById('checkboxRight').style.cursor = 'default';
            document.getElementById('checkboxLeft').style.cursor = 'pointer';
            document.getElementById('leftArrow').style.opacity = '1';
          }
          function functionLeft() {
            document.getElementById('grid').style.transform = 'translateX(0px)';
            // document.getElementById('leftArrow').style.opacity = '0.4';
            document.getElementById('checkboxLeft').style.cursor = 'default';
            document.getElementById('checkboxRight').style.cursor = 'pointer';
            document.getElementById('rightArrow').style.opacity = '1';
          }
        </script>
      </head>
      <body>
        <div class="wrapper">
          <div style="display: flex">
            <h2 style="font-size: 22px; font-weight: bold; padding: 20px"><span style="color: #2c357d">Hot </span><span style="color: #0291dd">Properties</span></h2>
            <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
              <span class="arrow left" id="leftArrow">
                <img style="width: 16px; height: 16px; transform: rotateY(-180deg)" src="https://www.nepalhomes.com/public/files/89D60042BDEB12C-arrow.png" />
              </span>
              <span class="arrow" id="rightArrow">
                <img style="width: 16px; height: 16px" src="https://www.nepalhomes.com/public/files/89D60042BDEB12C-arrow.png" />
              </span>
            </div>
          </div>
          <input id="checkboxLeft" class="left-arrow" onclick="functionLeft();" />
          <input id="checkboxRight" class="right-arrow" onclick="functionRight();" />
          <div class="grid" id="grid">
            <div class="item">
              <a href="https://nepalhomes.com" target="_blank" style="width: 100%; display: block; min-height: 80px; height: 100%; display: flex; justify-content: center; align-items: center; background: #EFEFF4">
                <img style="max-height: 40px;" src="https://www.nepalhomes.com/public/files/B86FD57602568C0-nepal-home-logo.png" alt="NepalHomes.com" />
              </a>
            </div>${property}</div>
            </div>
          </body>
        </html>`;
    return res.send(html);
  } catch (err) {
    next(err);
  }
};
propertyController.getPropertiesByPropTypeHTMLNew2 = async (req, res, next) => {
  try {
    const property_type = req.params.property_type;
    const searchQuery = { property_type: property_type };
    const populate = [
      {
        path: 'properties.id',
        select: {
          'basic.title': 1,
          slug_url: 1,
          property_id: 1,
          'price.value': 1,
          'price.is_price_on_call': 1,
          _id: 1,
        },
        populate: [
          { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
          { path: 'price.currency', select: { title: 1, _id: 0 } },
          { path: 'price.label', select: { title: 1, _id: 0 } },
        ],
      },
    ];
    let properties = await propertyTypSch.findOne(searchQuery).populate(populate);
    const p = properties.properties;
    let property = `
    <div id="firstGroup" class="firstGroup">
    <div class="item">
      <a href="https://nepalhomes.com/" target="_blank" style="width: 100%; display: block; min-height: 80px; height: 100%; display: flex; justify-content: center; align-items: center; background: #efeff4">
        <img style="max-height: 40px;" src="https://www.nepalhomes.com/public/files/B86FD57602568C0-nepal-home-logo.png" alt="NepalHomes.com" />
      </a>
    </div>`;
    for (let i = 0; i < p.length; i++) {
      if ((i + 1) % 3 == 0) {
        if (i == 2) {
          property += `</div>
        <div id="secondGroup" class="secondGroup">`;
        } else {
          property += `</div>
        <div id="thirdGroup" class="thirdGroup">`;
        }
      }
      property += `<div class="item">
      <div style="height: 100%;">
        <div style="position: relative; display: block; overflow: hidden; height: 152px">
          <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}">
            <img class="image" src="https://www.nepalhomes.com/public/400-300/media/${p[i].id.media.images[0].id.filename}" alt="${p[i].id.basic.title}" />
          </a>
        </div>
        <div style="padding:0px">
          <h3 class="heading">
            <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}">${p[i].id.basic.title}</a>
          </h3>
          <p style="font-size: 14px; font-weight: bold; margin-top: 4px">${p[i].id.price.value ? 'Rs.' + Intl.NumberFormat('en-IN').format(p[i].id.price.value) : 'Price on Call'}</p>
          <p style="font-size: 12px; color: #777; margin-top: 4px">${p[i].id.price.value && p[i].id.price.label.title ? p[i].id.price.label.title : ''}</p>
        </div>
      </div>
    </div>`;
      if (i == p.length - 1) {
        property += `
        </div>`;
      }
    }
    let html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript" async="" src="./Hot Properties_files/analytics.js.download"></script>
        <script async="" src="./Hot Properties_files/js"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'UA-150840081-2');
        </script>
        <title>Hot Properties</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          .wrapper {
            overflow: hidden;
            width: 100%;
            position: relative;
          }
          .grid {
            display: flex;
            margin: 0 -4px;
            transition: transform 0.5s cubic-bezier(0, 1.1, 0.26, 1.08);
          }
          .item {
            flex: 0 0 246px;
            padding: 0 10px;
          }
          .firstGroup {
            display: flex;
          }
          .secondGroup {
            display: none;
          }
          .thirdGroup {
            display: none;
          }
          .heading {
            color: #616161;
            font-size: 16px;
            font-weight: normal;
            line-height: 1.4;
            margin-top:12px;
          }
          .heading:hover {
            color: #0291dd;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          img.image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
    
          .arrow {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ddd;
            border-radius: 2px;
          }
          .arrow.left {
            margin-right: 10px;
          }
          .left-arrow,
          .right-arrow {
            position: absolute;
            right: 2px;
            top: 18px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            opacity: 0;
          }
          .left-arrow {
            right: 44px;
          }
    
          @media screen and (max-width: 767px) {
            .wrapper {
              width: 100%;
            }
    
            .grid {
              display: block;
            }

.grid .firstGroup, .grid .secondGroup, .grid .thirdGroup { display:block !important;}

            .heading {
              width: 99%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item { margin-top:20px;}
            .arrow { display:none !important; }
          }
        </style>
    
        <script type="text/javascript">
          let currentGroup = 1;
          function functionRight() {
            // document.getElementById("rightArrow").style.opacity = "0.4";
            // document.getElementById("checkboxRight").style.cursor = "default";
            // document.getElementById("checkboxLeft").style.cursor = "pointer";
            // document.getElementById("leftArrow").style.opacity = "1";
            document.getElementById('leftArrow').style.opacity = '1';
            document.getElementById('checkboxLeft').style.cursor = 'pointer';
    
            if (currentGroup === 1) {
              document.getElementById('firstGroup').style.display = 'none';
              document.getElementById('secondGroup').style.display = 'flex';
              document.getElementById('thirdGroup').style.display = 'none';
              document.getElementById('rightArrow').style.opacity = '1';
              document.getElementById('checkboxRight').style.cursor = 'pointer';
    
              currentGroup = 2;
            } else if (currentGroup === 2) {
              document.getElementById('firstGroup').style.display = 'none';
              document.getElementById('secondGroup').style.display = 'none';
              document.getElementById('thirdGroup').style.display = 'flex';
              // document.getElementById('rightArrow').style.opacity = '0.4';
              document.getElementById('checkboxRight').style.cursor = 'default';
    
              currentGroup = 3;
            }
          }
          function functionLeft() {
            document.getElementById('rightArrow').style.opacity = '1';
            document.getElementById('checkboxRight').style.cursor = 'pointer';
            if (currentGroup === 2) {
              document.getElementById('firstGroup').style.display = 'flex';
              document.getElementById('secondGroup').style.display = 'none';
              document.getElementById('thirdGroup').style.display = 'none';
              // document.getElementById('leftArrow').style.opacity = '0.4';
              document.getElementById('checkboxLeft').style.cursor = 'default';
    
              currentGroup = 1;
            } else if (currentGroup === 3) {
              document.getElementById('firstGroup').style.display = 'none';
              document.getElementById('secondGroup').style.display = 'flex';
              document.getElementById('thirdGroup').style.display = 'none';
              document.getElementById('leftArrow').style.opacity = '1';
              document.getElementById('checkboxLeft').style.cursor = 'pointer';
              currentGroup = 2;
            }
    
            // document.getElementById("leftArrow").style.opacity = "0.4";
            // document.getElementById("checkboxLeft").style.cursor = "default";
            // document.getElementById("checkboxRight").style.cursor = "pointer";
            // document.getElementById("rightArrow").style.opacity = "1";
          }
        </script>
      </head>
      <body>
        <div class="wrapper">
          <div style="display: flex">
            <h2 style="font-size: 22px; font-weight: bold; padding: 20px"><span style="color: #2c357d">Hot </span><span style="color: #0291dd">Properties</span></h2>
            <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end">
              <span class="arrow left" id="leftArrow" style="opacity: 1">
                <img style="width: 16px; height: 16px; transform: rotateY(-180deg)" src="https://www.nepalhomes.com/public/files/89D60042BDEB12C-arrow.png" />
              </span>
              <span class="arrow" id="rightArrow">
                <img style="width: 16px; height: 16px" src="https://www.nepalhomes.com/public/files/89D60042BDEB12C-arrow.png" />
              </span>
            </div>
          </div>
          <input id="checkboxLeft" class="left-arrow" onclick="functionLeft();" style="cursor: default" />
          <input id="checkboxRight" class="right-arrow" onclick="functionRight();" style="cursor: pointer" />
          <div class="grid" id="grid" style="">
            
              ${property}
            
    
            
          </div>
        </div>
      </body>
    </html>
    `;
    return res.send(html);
  } catch (err) {
    next(err);
  }
};
propertyController.getPropertiesByPropTypeHTML = async (req, res, next) => {
  try {
    const property_type = req.params.property_type;
    const searchQuery = { property_type: property_type };
    const populate = [
      {
        path: 'properties.id',
        select: {
          'basic.title': 1,
          slug_url: 1,
          property_id: 1,
          'price.value': 1,
          'price.is_price_on_call': 1,
          _id: 1,
        },
        populate: [
          { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
          { path: 'price.currency', select: { title: 1, _id: 0 } },
          { path: 'price.label', select: { title: 1, _id: 0 } },
        ],
      },
    ];
    // if (req.query.is_project == 'true') {
    //   searchQuery = { ...searchQuery, is_project: true };
    // } else {
    //   searchQuery = { ...searchQuery, is_project: { $ne: true } };
    // }
    let properties = await propertyTypSch.findOne(searchQuery).populate(populate);
    const p = properties.properties.slice(0, 3);
    let property = '';
    for (let i = 0; i < p.length; i++) {
      // property += `<div class="item"><div style="background-color:#f5f5fa;"><div style="position:relative; display: block; overflow: hidden; height:192px;"><a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}"><img class="image" src="https://www.nepalhomes.com/public/220-152/media/${p[i].id.media.images[0].id.filename}" alt="${p[i].id.basic.title}"></a></div><div style="padding:20px;"><h3 class="heading"><a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}">${p[i].id.basic.title}</a></h3><p style="font-size:14px; font-weight:bold; margin-top:20px;">Rs.${p[i].id.price.value}</p><p style="font-size:12px; color:#777; margin-top: 8px;";>${p[i].id.price.label.title}</p></div></div></div>`;
      property += `<div class="item">
      <div style="height: 100%;">
        <div
          style="
            position: relative;
            display: block;
            overflow: hidden;
            height: 152px;
          "
        >
          <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}">
            <img
              class="image"
              src="https://www.nepalhomes.com/public/400-300/media/${p[i].id.media.images[0].id.filename}"
              alt="${p[i].id.basic.title}"
            />
          </a>
        </div>
        <div style="padding:0px">
          <h3 class="heading">
            <a target="_blank" href="https://www.nepalhomes.com/detail/${p[i].id.slug_url}"
              >${p[i].id.basic.title}</a
            >
          </h3>
          <p style="font-size: 16px; color:#00a4e4; font-weight: bold; margin-top: 4px">
            ${p[i].id.price.value ? 'Rs.' + Intl.NumberFormat('en-IN').format(p[i].id.price.value) : 'Price on Call'}
          </p>
          <p style="font-size: 12px; color: #777; margin-top: 4px">
          ${p[i].id.price.value && p[i].id.price.label.title ? p[i].id.price.label.title : ''}
          </p>
        </div>
      </div>
    </div>
`;
    }
    let html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-150840081-2"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "UA-150840081-2");
        </script>
        <title>Hot Properties</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 10px;
            grid-row-gap: 10px;
          }
          .heading {
            color: #616161;
            font-size: 16px;
            font-weight: normal;
            line-height: 1.4;
            margin-top:12px;
          }
          .heading:hover {
            color: #0291dd;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          img.image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          @media screen and (max-width: 667px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media screen and (max-width: 550px) {
            .grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        </style>
      </head>
      <body>
        <h2 style="font-size: 28px; font-weight: normal; padding: 20px">
          <span style="color: #2c357d">Hot </span>
          <span style="color: #0291dd">Properties</span>
        </h2>
        <div class="grid">
          <div class="item">
          <a href="https://nepalhomes.com" target="_blank" style="width: 100%; display: block; min-height: 80px; height: 100%; display: flex; justify-content: center; align-items: center; background: #0291dd">
            <img style="max-height: 40px;" src="https://www.nepalhomes.com/public/files/F7155EA40975F7B-logo.png" alt="NepalHomes.com" />
          </a>
          </div>${property}</div>
          </body>
        </html>`;
    return res.send(html);
  } catch (err) {
    next(err);
  }
};

propertyController.getBypropertyId = async (req, res, next) => {
  try {
    const id = req.params.property_id;
    const populate = [
      { path: 'address.state_id', select: { state_name: 1, _id: 0 } },
      { path: 'address.district_id', select: { district_name: 1, _id: 0 } },
      { path: 'address.city_id', select: { municipality_name: 1, _id: 0 } },
      { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
      { path: 'price.currency', select: { title: 1, _id: 0 } },
      { path: 'price.label', select: { title: 1, _id: 0 } },
    ];
    const properties = await propertySch
      .findOne({
        property_id: id,
        is_deleted: false,
      })
      .select('_id price property_id project_id')
      .populate(populate);

    return otherHelper.sendResponse(res, httpStatus.OK, true, properties, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};
propertyController.getByProjectId = async (req, res, next) => {
  try {
    const id = req.params.property_id;
    const populate = [
      { path: 'address.state_id', select: { state_name: 1, _id: 0 } },
      { path: 'address.district_id', select: { district_name: 1, _id: 0 } },
      { path: 'address.city_id', select: { municipality_name: 1, _id: 0 } },
      { path: 'media.images.id', select: { filename: 1, path: 1, _id: 0 } },
      { path: 'price.currency', select: { title: 1, _id: 0 } },
      { path: 'price.label', select: { title: 1, _id: 0 } },
    ];
    const properties = await propertySch
      .findOne({
        project_id: id,
        is_deleted: false,
      })
      .select('_id price project_id')
      .populate(populate);

    return otherHelper.sendResponse(res, httpStatus.OK, true, properties, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};

//

propertyController.GetPublicPropertyDetail = async (req, res, next) => {
  try {
    const slug_url = req.params.slug_url;
    let otherRelatedProperty = [];
    const populate = [
      { path: 'basic.property_purpose', select: { title: 1, _id: 0 } },
      { path: 'basic.property_type', select: { title: 1, _id: 0 } },
      { path: 'basic.property_category', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: { name: 1, _id: 0 } },
      { path: 'address.district_id', select: { name: 1, _id: 0 } },
      { path: 'address.city_id', select: { name: 1, _id: 0 } },
      { path: 'address.area_id', select: { name: 1 } },
      { path: 'basic.property_ownership', select: { title: 1, _id: 0 } },
      {
        path: 'location_property.total_area_unit',
        select: { title: 1, _id: 0 },
      },
      {
        path: 'location_property.built_area_unit',
        select: { title: 1, _id: 0 },
      },
      { path: 'location_property.property_face', select: { title: 1, _id: 0 } },
      {
        path: 'location_property.road_access_length_unit',
        select: { title: 1, _id: 0 },
      },
      {
        path: 'location_property.road_access_road_type',
        select: { title: 1, _id: 0 },
      },
      { path: 'building.calender_type', select: { title: 1, _id: 0 } },
      { path: 'building.furnishing', select: { title: 1, _id: 0 } },
      { path: 'building.amenities', select: { title: 1, _id: 0, media: 1 } },
      { path: 'price.currency', select: { title: 1, _id: 0 } },
      { path: 'price.label', select: { title: 1, _id: 0 } },
      { path: 'agency_id' },
      { path: 'developer_id' },
      { path: 'added_by', select: { name: 1, bio: 1, image: 1, mobile_no: 1, email: 1, _id: 1 } },
      { path: 'agent_id', select: { name: 1, bio: 1, image: 1, mobile_no: 1, email: 1, _id: 0 } },
      { path: 'media.images.id', select: { filename: 1, path: 1 } },
      { path: 'media.images.caption', select: { title: 1 } },
      { path: 'project_features.feature', select: { title: 1 } },
      { path: 'project_floor_plan.image', select: { filename: 1, path: 1 } },
      { path: 'project_payment_plan.image', select: { filename: 1, path: 1 } },
      { path: 'project_property_type.image' },
      { path: 'project_property_type.area_option' },
      { path: 'project_status' },
    ];

    const properties = await propertySch
      .findOne({
        slug_url: slug_url,
        is_deleted: false,
        is_active: true,
      })
      .populate(populate);
    if (properties) {
      if (properties.agency_id) {
        otherRelatedProperty = await propertySch
          .find({ agency_id: properties.agency_id, is_deleted: false, is_verified: true, slug_url: { $ne: slug_url } })
          .limit(4)
          .populate(populate);
        otherRelatedProperty = [...otherRelatedProperty];
      }
      if (properties.developer_id) {
        otherRelatedProperty = await propertySch
          .find({ developer_id: properties.developer_id, is_deleted: false, is_verified: true, slug_url: { $ne: slug_url } })
          .limit(4)
          .populate(populate);
        otherRelatedProperty = [...otherRelatedProperty];
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, 'product not found', 'product not found', null);
    }

    return otherHelper.sendResponse(res, httpStatus.OK, true, { properties, otherRelatedProperty }, null, propertyConfig.get, null);
  } catch (err) {
    next(err);
  }
};

propertyController.GetCount = async (req, res, next) => {
  try {
    let property = {};
    let status = {};
    const user = await usrSch
      .findById(req.user.id)
      .populate([{ path: 'agent.agency' }, { path: 'builder.developer' }])
      .select({ agent: 1, builder: 1, author: 1 });
    property.isActiveCount = await propertySch.countDocuments({
      added_by: req.user.id,
      is_active: true,
      is_deleted: false,
    });
    property.isPendingCount = await propertySch.countDocuments({
      added_by: req.user.id,
      is_pending: true,
      is_deleted: false,
    });
    property.isRejectedCount = await propertySch.countDocuments({
      added_by: req.user.id,
      is_rejected: true,
      is_deleted: false,
    });
    property.isFavouriteCount = await propertySch.countDocuments({
      added_by: req.user.id,
      is_favourite: true,
      is_deleted: false,
    });
    status.agent = user.agent;
    status.builder = user.builder;
    status.author = user.author;

    return otherHelper.sendResponse(res, httpStatus.OK, true, { property, status }, null, 'Count Get success!!', null);
  } catch (err) {
    next(err);
  }
};
//offer
propertyController.saveOffer = async (req, res, next) => {
  try {
    let propId = req.params.propId;
    const isInProperty = await propertySch.findById(propId);
    if (isInProperty) {
      const offerData = req.body;
      offerData.propertyId = propId;
      if (offerData && offerData._id) {
        const update = await offerSch.findByIdAndUpdate(offer._id, { $set: offerData }, { new: true });
        if (update) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, propertyConfig.save, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'cannot save offer', null);
        }
      } else {
        // offerData.added_by = req.user.id;

        let d = { name: offerData.name, email: offerData.email, inquiry: offerData.message, channel: 'Property_Inquiries', phone_no: offerData.phone, property_id: propId };
        if (isInProperty.agent_id) {
          d = { ...d, agent_id: isInProperty.agent_id, agent_assigned_at: new Date() };
        } else {
          d = { ...d, agent_id: isInProperty.owened_by, agent_assigned_at: new Date() };
        }
        const newLead = new leadSch(d);
        const save = await newLead.save();
        const newOffer = new offerSch(offerData);
        const offerSave = await newOffer.save();
        if (offerSave) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, offerSave, null, propertyConfig.save, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'cannot save offer', null);
        }
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'cannot save offer ', null);
    }
  } catch (err) {
    next(err);
  }
};
propertyController.getOfferByAdmin = async (req, res, next) => {
  try {
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'propertyId', select: 'basic.title _id' },
    ];
    let selectQuery = '';
    let searchQuery = {
      is_deleted: false,
      is_active: true,
    };
    let offerResults = await callGetOffers(req, res, next, searchQuery, populate, selectQuery);
    return offerResults;
  } catch (err) {
    next(err);
  }
};
propertyController.getOfferByPropId = async (req, res, next) => {
  try {
    propertyId = req.params.propId;
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'propertyId', select: 'basic.title _id' },
    ];
    let selectQuery = '';
    let searchQuery = {
      is_deleted: false,
      is_active: true,
      propertyId: propertyId,
    };
    let offerResults = await callGetOffers(req, res, next, searchQuery, populate, selectQuery);
    return offerResults;
  } catch (err) {
    next(err);
  }
};
propertyController.getOfferByUser = async (req, res, next) => {
  try {
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'propertyId', select: 'basic.title _id' },
    ];
    let selectQuery = '';
    let searchQuery = {
      is_deleted: false,
      is_active: true,
      added_by: req.user.id,
    };
    let offerResults = await callGetOffers(req, res, next, searchQuery, populate, selectQuery);
    return offerResults;
  } catch (err) {
    next(err);
  }
};
propertyController.getOfferById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'propertyId', select: 'basic.title _id' },
    ];
    let selectQuery = '';
    let searchQuery = {
      _id: id,
      is_deleted: false,
      is_active: true,
      // added_by: req.user.id,
    };
    let offerResults = await callGetOffers(req, res, next, searchQuery, populate, selectQuery);
    return offerResults;
  } catch (err) {
    next(err);
  }
};
let callGetOffers = async (req, res, next, searchQuery, populate, selectQuery) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery = '';
    //let page =  assignPage(req.query.page) ? assignPage(req.query.page) : 1;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size) ? assignSize(req.query.size) :size_default;
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    // let sortQuery = assignQuerySort(req.query.sort) ? assignQuerySort(req.query.sort) :"-1";
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
        sortQuery = '-1';
      }
    }

    if (req.query.find_name) {
      searchQuery = {
        title: {
          $regex: req.query.find_name,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    offers = await otherHelper.getquerySendResponse(offerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, offers.data, propertyConfig.offerGet, page, size, offers.totaldata);
  } catch (err) {
    next(err);
  }
};
propertyController.getOfferById = async (req, res, next) => {
  try {
    // const id = req.params.property_id;
    const populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'propertyId', select: 'basic.title _id' },
    ];
    const offer = await offerSch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate(populate);

    return otherHelper.sendResponse(res, httpStatus.OK, true, offer, null, propertyConfig.offerGet, null);
  } catch (err) {
    next(err);
  }
};
propertyController.getOffermessageforadmin = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = { path: 'propertyId' };
    let offerdata = await otherHelper.getquerySendResponse(offerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, offerdata.data, 'msg get successfully', page, size, offerdata.totaldata);
  } catch (err) {
    next(err);
  }
};
propertyController.getOffermessageforuser = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    let list = await propertySch.find({ added_by: req.user.id }, { _id: 1 });
    populate = { path: 'propertyId' };
    searchQuery = { propertyId: { $in: list } };
    let offerdata = await otherHelper.getquerySendResponse(offerSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, offerdata.data, 'msg get successfully', page, size, offerdata.totaldata);
  } catch (err) {
    next(err);
  }
};
module.exports = propertyController;

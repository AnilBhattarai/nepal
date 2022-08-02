const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const isEmpty = require('./../../validation/isEmpty');
const { area, vdcMunicipality, disctrict, state } = require('./staticShema');
const staticController = {};
const internal = {};

staticController.GetStates = async (req, res, next) => {
  try {
    const size_default = 10;
    // let page;
    // let size;
    // let sortQuery = 'state_name';
    // let searchQuery;
    // let populate;
    // let selectQuery;
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const state1 = await state.find({ is_deleted: false, is_active: true }).select('stateID state_name');

        if (!isEmpty(state1)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, state1, null, `States opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `State Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'stateID state_name description added_by is_active';

    searchQuery = {
      is_deleted: false,
    };

    if (req.query.find_state) {
      searchQuery = { state_name: { $regex: req.query.find_state, $options: 'i' }, ...searchQuery };
    }

    let states = await otherHelper.getquerySendResponse(state, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, states.data, 'States sucessfully retrieved', page, size, states.totaldata);
  } catch (err) {
    next(err);
  }
};
staticController.GetVdcMunicipalityByDistrict = async (req, res, next) => {
  try {
    const districts = req.params.districtId && (await disctrict.findById(req.params.districtId));
    const districtID = districts && districts.districtID;
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'municipality_name';
    let searchQuery;
    let populate;
    let selectQuery;

    if (districtID == 0) {
      searchQuery = {
        is_deleted: false,
      };
    } else {
      searchQuery = {
        is_deleted: false,
        districtID,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const municipality1 = await vdcMunicipality.find(searchQuery).select('municipalityID municipality_name');

        if (!isEmpty(municipality1)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, municipality1, null, `Municipality opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Municipality Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'municipalityID municipality_name description districtID added_by is_active';

    if (req.query.find_municipality) {
      searchQuery = { municipality_name: { $regex: req.query.find_municipality, $options: 'i' }, ...searchQuery };
    }

    populate = '';

    let states = await otherHelper.getquerySendResponse(vdcMunicipality, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, states.data, 'Municipalities sucessfully retrieved', page, size, states.totaldata);
  } catch (err) {
    next(err);
  }
};
staticController.GetVdcMunicipality = async (req, res, next) => {
  try {
    const districtID = req.params.districtId;
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'municipality_name';
    let searchQuery;
    let populate;
    let selectQuery;

    if (districtID == 0 || districtID == '_id') {
      searchQuery = {
        is_deleted: false,
      };
    } else {
      searchQuery = {
        is_deleted: false,
        districtID,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const municipality1 = await vdcMunicipality.find(searchQuery).select('municipalityID municipality_name');

        if (!isEmpty(municipality1)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, municipality1, null, `Municipality opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Municipality Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'municipalityID municipality_name description districtID added_by is_active';

    if (req.query.find_municipality) {
      searchQuery = { municipality_name: { $regex: req.query.find_municipality, $options: 'i' }, ...searchQuery };
    }

    populate = '';

    let states = await otherHelper.getquerySendResponse(vdcMunicipality, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, states.data, 'Municipalities sucessfully retrieved', page, size, states.totaldata);
  } catch (err) {
    next(err);
  }
};
staticController.GetAreaByVdcMunicipality = async (req, res, next) => {
  try {
    const municipalit = req.params.municipalityID && (await vdcMunicipality.findById(req.params.municipalityID));
    const municipalityID = municipalit && municipalit.municipalityID;
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'area_name';
    let searchQuery;
    let populate;
    let selectQuery;

    if (municipalityID == 0) {
      searchQuery = {
        is_deleted: false,
      };
    } else {
      searchQuery = {
        is_deleted: false,
        municipalityID: +municipalityID,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const area1 = await area.find(searchQuery).select('areaID area_name');

        if (!isEmpty(area1)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, area1, null, `Area opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Area Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'municipalityID area_name description areaID added_by is_active';

    if (req.query.find_area) {
      searchQuery = { area_name: { $regex: req.query.find_area, $options: 'i' }, ...searchQuery };
    }

    populate = '';

    let states = await otherHelper.getquerySendResponse(area, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, states.data, 'Area sucessfully retrieved', page, size, states.totaldata);
  } catch (err) {
    next(err);
  }
};
staticController.GetArea = async (req, res, next) => {
  try {
    const municipalityID = req.params.municipalityID;
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'area_name';
    let searchQuery;
    let populate;
    let selectQuery;

    if (municipalityID == 0 || municipalityID == '_id') {
      searchQuery = {
        is_deleted: false,
      };
    } else {
      searchQuery = {
        is_deleted: false,
        municipalityID: +municipalityID,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const area1 = await area.find(searchQuery).select('areaID area_name');

        if (!isEmpty(area1)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, area1, null, `Area opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Area Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'municipalityID area_name description areaID added_by is_active';

    if (req.query.find_area) {
      searchQuery = { area_name: { $regex: req.query.find_area, $options: 'i' }, ...searchQuery };
    }

    populate = '';

    let states = await otherHelper.getquerySendResponse(area, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, states.data, 'Area sucessfully retrieved', page, size, states.totaldata);
  } catch (err) {
    next(err);
  }
};
staticController.GetDisctrictByStateID = async (req, res, next) => {
  try {
    const stateid = req.params.stateId && (await state.findById(req.params.stateId));
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'district_name';
    let searchQuery;
    let populate;
    let selectQuery;

    const stateId = (stateid && stateid.stateID) || 0;
    if (stateId != 0) {
      searchQuery = {
        is_deleted: false,
        stateID: stateId,
      };
    } else {
      searchQuery = {
        is_deleted: false,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const district = await disctrict.find(searchQuery).select('district_name districtID stateID');

        if (!isEmpty(district)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, district, null, ` opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `district Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'is_active stateID description district_name districtID';

    populate = '';

    if (req.query.find_district) {
      searchQuery = { district_name: { $regex: req.query.find_district, $options: 'i' }, ...searchQuery };
    }
    let districts = await otherHelper.getquerySendResponse(disctrict, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, districts.data, 'Districts sucessfully retrieved', page, size, districts.totaldata);
  } catch (err) {
    next(err);
  }
};

staticController.GetDisctrict = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery = 'district_name';
    let searchQuery;
    let populate;
    let selectQuery;

    const stateId = req.params.stateId;
    if (stateId == 0 || stateId == '_id') {
      searchQuery = {
        is_deleted: false,
      };
    } else {
      searchQuery = {
        is_deleted: false,
        stateID: stateId,
      };
    }

    if (req.query.page === 0 || req.query.page === '0') {
      try {
        const district = await disctrict.find(searchQuery).select('district_name districtID stateID');
        if (!isEmpty(district)) {
          return otherHelper.sendResponse(res, httpStatus.OK, true, district, null, ` opened!`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `district Not Found`, null);
        }
      } catch (err) {
        next(err);
      }
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

    selectQuery = 'is_active stateID description district_name districtID';

    populate = '';

    if (req.query.find_district) {
      searchQuery = { district_name: { $regex: req.query.find_district, $options: 'i' }, ...searchQuery };
    }
    let districts = await otherHelper.getquerySendResponse(disctrict, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, (districts && districts.data) || [], 'Districts sucessfully retrieved', page, size, (districts && districts.totaldata) || 0);
  } catch (err) {
    next(err);
  }
};

staticController.getStateDetail = async (req, res, next) => {
  const id = req.params.id;
  const states = await state
    .findOne({ _id: id, is_deleted: false })
    .select('description stateID state_name is_active added_by added_at updated_by updated_at')
    .populate([
      { path: 'added_by', select: 'name email avatar' },
      { path: 'updated_by', select: 'name email avatar' },
    ]);
  if (!isEmpty(states)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, states, null, `${states.state_name} opened!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `State Not FOund`, null);
  }
};

staticController.getDistrictDetail = async (req, res, next) => {
  const id = req.params.id;
  const districts = await disctrict
    .findOne({ _id: id, is_deleted: false })
    .select('description stateID district_name districtID is_active added_by added_at updated_by updated_at')
    .populate([
      { path: 'added_by', select: 'name email avatar' },
      { path: 'updated_by', select: 'name email avatar' },
    ]);
  if (!isEmpty(districts)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, districts, null, `${districts.district_name} opened!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `District Not FOund`, null);
  }
};

staticController.getMunicipalityDetail = async (req, res, next) => {
  const id = req.params.id;
  const municipalities = await vdcMunicipality
    .findOne({ _id: id, is_deleted: false })
    .select('description municipalityID municipality_name districtID is_active added_by added_at updated_by updated_at')
    .populate([
      { path: 'added_by', select: 'name email avatar' },
      { path: 'updated_by', select: 'name email avatar' },
    ]);
  if (!isEmpty(municipalities)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, municipalities, null, `${municipalities.municipality_name} opened!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Municipality Not FOund`, null);
  }
};

staticController.getAreaDetail = async (req, res, next) => {
  const id = req.params.id;
  const Areas = await area
    .findOne({ _id: id, is_deleted: false })
    .select('description municipalityID area_name areaID is_active added_by added_at updated_by updated_at')
    .populate([
      { path: 'added_by', select: 'name email avatar' },
      { path: 'updated_by', select: 'name email avatar' },
    ]);
  if (!isEmpty(Areas)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, Areas, null, `${Areas.area_name} opened!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Area Not FOund`, null);
  }
};

staticController.postStates = async (req, res, next) => {
  let checkdata;

  let { state_name, is_active } = req.body;
  try {
    if (req.body._id) {
      let update = await state.findOneAndUpdate({ _id: req.body._id, is_deleted: false }, { $set: { state_name, is_active, updated_by: req.user.id, updated_at: new Date() } }, { new: true });

      // for (let i = 0; i < district_name.length; i++) {
      //   const district = new disctrict({
      //     district_name: district_name,
      //     state: state,
      //     updated_at: Date.now(),
      //     updated_by: req.user.id,
      //     is_active: true,
      //   });
      //   const districtSave = await district.save();
      // }

      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `State Not Found`, null);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, `${state_name} updated!`, null);
    } else {
      // checkdata = await state.findOne({ $or: [{ stateID }, { state_name }] });
      // if (!isEmpty(checkdata)) {
      //   return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'StateID already exists', null);
      // }
      let newState = new state({ state_name, is_active, added_by: req.user.id });
      // for (let i = 0; i < req.body.district_name.length; i++) {
      //   const district = new disctrict({
      //     district_name: district_name,
      //     state: state,
      //     updated_at: Date.now(),
      //     updated_by: req.user.id,
      //     is_active: true,
      //   });
      //   const districtSave = await district.save();
      // }
      let savedstat = await newState.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savedstat, null, `${state_name} added!`, null);
    }
  } catch (err) {
    next(err);
  }
};

staticController.postDistrict = async (req, res, next) => {
  let checkdata;
  let { stateID, district_name, is_active, description, districtID } = req.body;
  try {
    if (req.body._id) {
      let update = await disctrict.findOneAndUpdate({ _id: req.body._id, is_deleted: false }, { $set: { stateID, district_name, is_active, description, districtID, updated_by: req.user.id, updated_at: new Date() } }, { new: true });
      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `District Not Found`, null);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, `${district_name} updated!`, null);
    } else {
      // checkdata = await disctrict.findOne({ $or: [{ districtID }, { district_name }] });
      // if (!isEmpty(checkdata)) {
      //   return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'DistrictID or DistrictName already exists', null);
      // }
      let newdistrict = new disctrict({ stateID, district_name, is_active, description, districtID, added_by: req.user.id });
      let savedstat = await newdistrict.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savedstat, null, `${district_name} added!`, null);
    }
  } catch (err) {
    next(err);
  }
};
staticController.postMunicipality = async (req, res, next) => {
  let { municipality_name, municipalityID, is_active, description, districtID } = req.body;
  try {
    if (req.body._id) {
      let update = await vdcMunicipality.findOneAndUpdate({ _id: req.body._id, is_deleted: false }, { $set: { municipality_name, municipalityID, is_active, description, districtID, updated_by: req.user.id, updated_at: new Date() } }, { new: true });
      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Municipality Not Found`, null);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, `${municipality_name} updated!`, null);
    } else {
      let newmunicipality = new vdcMunicipality({ municipality_name, municipalityID, is_active, description, districtID, added_by: req.user.id });
      let savedstat = await newmunicipality.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savedstat, null, `${municipality_name} added!`, null);
    }
  } catch (err) {
    next(err);
  }
};
staticController.postArea = async (req, res, next) => {
  let { area_name, municipalityID, is_active, description, areaID } = req.body;
  try {
    if (req.body._id) {
      let update = await area.findOneAndUpdate({ _id: req.body._id, is_deleted: false }, { $set: { area_name, municipalityID, is_active, description, areaID, updated_by: req.user.id, updated_at: new Date() } }, { new: true });
      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Area Not Found`, null);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, `${area_name} updated!`, null);
    } else {
      let newarea = new area({ area_name, municipalityID, is_active, description, areaID, added_by: req.user.id });
      let savedstat = await newarea.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savedstat, null, `${area_name} added!`, null);
    }
  } catch (err) {
    next(err);
  }
};

staticController.deleteState = async (req, res, next) => {
  const id = req.params.id;
  const delstate = await state.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() } });
  if (!isEmpty(delstate)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, `${delstate.state_name} deleted!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `State doesn't exist!`, null);
  }
};

staticController.deleteDistrict = async (req, res, next) => {
  const id = req.params.id;
  const deldistrict = await disctrict.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() } });
  if (!isEmpty(deldistrict)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, `${deldistrict.district_name} deleted!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `District doesn't exist!`, null);
  }
};

staticController.deleteMunicipility = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delmunicipality = await vdcMunicipality.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() } });
    if (!isEmpty(delmunicipality)) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, `${delmunicipality.municipality_name} deleted!`, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Municipality doesn't exist!`, null);
    }
  } catch (err) {
    next(err);
  }
};

staticController.deleteArea = async (req, res, next) => {
  const id = req.params.id;
  const delarea = await area.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() } });
  if (!isEmpty(delarea)) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, `${delarea.area_name} deleted!`, null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, `Area doesn't exist!`, null);
  }
};

module.exports = staticController;

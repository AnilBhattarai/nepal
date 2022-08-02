const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const isEmpty = require('./../../validation/isEmpty');
const { stateSch, vdcMunicipalitySch, disctrictSch, areaSch } = require('./nepalLocationSchema');
const nepalLocationController = {};
const internal = {};

nepalLocationController.getLocationList = async (req, res, next) => {
  try {
    const level = req.params.level;
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { ...searchQuery, name: { $regex: req.query.find_name, $options: 'i' } };
    }
    if (level === 'state') {
      let allState = await otherHelper.getquerySendResponse(stateSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allState.data, 'States', page, size, allState.totaldata);
    }
    if (level === 'district') {
      if (req.query.state_id) {
        searchQuery = { ...searchQuery, state_id: req.query.state_id };
      }
      populate = [{ path: 'state_id', select: 'name slug' }];
      let allDistrict = await otherHelper.getquerySendResponse(disctrictSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allDistrict.data, 'District', page, size, allDistrict.totaldata);
    }
    if (level === 'vdc') {
      if (req.query.state_id) {
        searchQuery = { ...searchQuery, state_id: req.query.state_id };
      }
      if (req.query.district_id) {
        searchQuery = { ...searchQuery, district_id: req.query.district_id };
      }
      populate = [
        { path: 'state_id', select: 'name slug' },
        { path: 'district_id', select: 'name slug' },
      ];
      let allVdcMuncipality = await otherHelper.getquerySendResponse(vdcMunicipalitySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allVdcMuncipality.data, 'Vdc-Muncipality', page, size, allVdcMuncipality.totaldata);
    }
    if (level === 'area') {
      if (req.query.state_id) {
        searchQuery = { ...searchQuery, state_id: req.query.state_id };
      }
      if (req.query.district_id) {
        searchQuery = { ...searchQuery, district_id: req.query.district_id };
      }
      if (req.query.np_vdcmunicipality) {
        searchQuery = { ...searchQuery, vdcmunicipality_id: req.query.np_vdcmunicipality };
      }
      populate = [
        { path: 'state_id', select: 'name slug' },
        { path: 'district_id', select: 'name slug' },
        { path: 'vdcmunicipality_id', select: 'name slug' },
      ];
      let allArea = await otherHelper.getquerySendResponse(areaSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allArea.data, 'Area', page, size, allArea.totaldata);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, `Invalid Call`, `Invalid Call`, null);
    }
  } catch (err) {
    next(err);
  }
};
nepalLocationController.getLocationDetail = async (req, res, next) => {
  try {
    const level = req.params.level;
    const id = req.params.id;
    if (level === 'state') {
      let state = await stateSch.findById(id).lean();
      if (state) {
        const districts = await disctrictSch.find({ state_id: id, is_deleted: false }).lean();
        state.districts = districts;
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, state, null, `States`, null);
    }
    if (level === 'district') {
      let district = await disctrictSch
        .findById(id)
        .populate([{ path: 'state_id', select: 'name slug' }])
        .lean();
      if (district) {
        const vdcs = await vdcMunicipalitySch.find({ district_id: id, is_deleted: false }).lean();
        district.vdcs = vdcs;
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, district, null, `District`, null);
    }
    if (level === 'vdc') {
      let vdc = await vdcMunicipalitySch
        .findById(id)
        .populate([
          { path: 'state_id', select: 'name slug' },
          { path: 'district_id', select: 'name slug' },
        ])
        .lean();
      if (vdc) {
        const areas = await areaSch.find({ vdcmunicipality_id: id, is_deleted: false }).lean();
        vdc.areas = areas;
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, vdc, null, `VDC`, null);
    }
    if (level === 'area') {
      let vdc = await areaSch
        .findById(id)
        .populate([
          { path: 'state_id', select: 'name slug' },
          { path: 'district_id', select: 'name slug' },
          { path: 'vdcmunicipality_id', select: 'name slug' },
        ])
        .lean();
      return otherHelper.sendResponse(res, httpStatus.OK, true, vdc, null, `Area`, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, `Invalid Call`, `Invalid Call`, null);
    }
  } catch (err) {
    next(err);
  }
};

nepalLocationController.saveLocation = async (req, res, next) => {
  try {
    const level = req.params.level;
    if (level === 'state') {
      let { _id, name, slug, order, is_active, is_deleted, districts, is_sub } = req.body;

      if (!slug && name) {
        slug = otherHelper.slugify(name);
      }
      if (_id) {
        if (is_deleted) {
          const response = await stateSch.findByIdAndUpdate(_id, { $set: { is_deleted, deleted_by: req.user.id, deleted_at: new Date() } }, { new: true });

          if (!is_deleted || is_deleted) {
            const deleteSub = await Promise.all([disctrictSch.updateMany({ state_id: _id }, { $set: { is_deleted: is_deleted } }), vdcMunicipalitySch.updateMany({ state_id: _id }, { $set: { is_deleted: is_deleted } }), areaSch.updateMany({ state_id: _id }, { $set: { is_deleted: is_deleted } })]);
          }

          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `State Deleted`, null);
        } else {
          let response = await stateSch.findByIdAndUpdate(_id, { $set: { name, slug, order, is_active } }, { new: true }).lean();
          if (response) {
            let responseDistict = [];
            await disctrictSch.updateMany({ state_id: _id }, { $set: { is_deleted: true } }, { new: true });
            for (let i = 0; i < districts.length; i++) {
              districts[i].state_id = _id;
              districts[i].is_deleted = false;
              districts[i].slug = districts[i].slug ? districts[i].slug : otherHelper.slugify(slug + '-' + districts[i].name);
              if (districts[i]._id) {
                const d = await disctrictSch.findByIdAndUpdate(districts[i]._id, { $set: districts[i] }, { new: true });
                responseDistict.push(d);
              } else {
                districts[i].added_by = req.user.id;
                const newDistrict = new disctrictSch(districts[i]);
                const d = await newDistrict.save();
                responseDistict.push(d);
              }
            }
            response.district = responseDistict;
          }
          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `State Updated`, null);
        }
      } else {
        const name = req.body.name.trim();
        const checkIf = await stateSch.findOne({ name: { $regex: name, $options: 'i' }, is_deleted: false });
        if (checkIf) {
          error = { name: 'Name Already exists' };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
        }

        const newState = new stateSch({ name, slug, order, is_active, added_by: req.user.id });
        let data = await newState.save();
        let response = await stateSch.findById(data._id).lean();
        if (response) {
          let responseDistict = [];
          await disctrictSch.updateMany({ state_id: response._id }, { $set: { is_deleted: true } }, { new: true });
          for (let i = 0; i < districts.length; i++) {
            districts[i].state_id = response._id;
            districts[i].is_deleted = false;
            districts[i].slug = districts[i].slug ? districts[i].slug : otherHelper.slugify(slug + '-' + districts[i].name);
            if (districts[i]._id) {
              const d = await disctrictSch.findByIdAndUpdate(districts[i]._id, { $set: districts[i] }, { new: true });
              responseDistict.push(d);
            } else {
              districts[i].added_by = req.user.id;
              const newDistrict = new disctrictSch(districts[i]);
              const d = await newDistrict.save();
              responseDistict.push(d);
            }
          }
          response.district = responseDistict;
        }
        return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `State Saved`, null);
      }
    }
    if (level === 'district') {
      let { _id, name, slug, order, is_active, is_deleted, vdcs, state_id } = req.body;
      if (!slug && name) {
        slug = otherHelper.slugify(name);
      }
      if (_id) {
        if (is_deleted) {
          const response = await disctrictSch.findByIdAndUpdate(_id, { $set: { is_deleted, deleted_by: req.user.id, deleted_at: new Date() } }, { new: true });

          if (!is_deleted || is_deleted) {
            const deleteSub = await Promise.all([vdcMunicipalitySch.updateMany({ district_id: _id }, { $set: { is_deleted: is_deleted } }), areaSch.updateMany({ district_id: _id }, { $set: { is_deleted: is_deleted } })]);
          }
          if (is_deleted) {
            const deleteParent = await Promise.all([stateSch.updateOne({ _id: response.state_id }, { $set: { is_deleted: is_deleted } })]);
          }

          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `District Deleted`, null);
        } else {
          let response = await disctrictSch.findByIdAndUpdate(_id, { $set: { name, slug, order, is_active, state_id } }, { new: true }).lean();
          if (response) {
            let responseVdc = [];
            await vdcMunicipalitySch.updateMany({ district_id: _id }, { $set: { is_deleted: true } }, { new: true });
            for (let i = 0; i < vdcs.length; i++) {
              vdcs[i].state_id = state_id;
              vdcs[i].district_id = _id;
              vdcs[i].is_deleted = false;
              vdcs[i].slug = vdcs[i].slug ? vdcs[i].slug : otherHelper.slugify(slug + '-' + vdcs[i].name);
              if (vdcs[i]._id) {
                const d = await vdcMunicipalitySch.findByIdAndUpdate(vdcs[i]._id, { $set: vdcs[i] }, { new: true });
                responseVdc.push(d);
              } else {
                vdcs[i].added_by = req.user.id;
                const newDistrict = new vdcMunicipalitySch(vdcs[i]);
                const d = await newDistrict.save();
                responseVdc.push(d);
              }
            }
            response.vdc = responseVdc;
          }
          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `District Updated`, null);
        }
      } else {
        const name = req.body.name.trim();
        const checkIf = await disctrictSch.findOne({ name: { $regex: name, $options: 'i' }, is_deleted: false });
        if (checkIf) {
          error = { name: 'Name Already exists' };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
        }
        const newState = new disctrictSch({ name, slug, order, is_active, added_by: req.user.id, state_id: state_id });
        let data = await newState.save();
        let response = await disctrictSch.findById(data._id).lean();
        if (response) {
          let responseVdc = [];
          await vdcMunicipalitySch.updateMany({ district_id: response._id }, { $set: { is_deleted: true } }, { new: true });
          for (let i = 0; i < vdcs.length; i++) {
            vdcs[i].state_id = state_id;
            vdcs[i].district_id = response._id;
            vdcs[i].is_deleted = false;
            vdcs[i].slug = vdcs[i].slug ? vdcs[i].slug : otherHelper.slugify(slug + '-' + vdcs[i].name);
            if (vdcs[i]._id) {
              const d = await vdcMunicipalitySch.findByIdAndUpdate(vdcs[i]._id, { $set: vdcs[i] }, { new: true });
              responseVdc.push(d);
            } else {
              vdcs[i].added_by = req.user.id;
              const newDistrict = new vdcMunicipalitySch(vdcs[i]);
              const d = await newDistrict.save();
              responseVdc.push(d);
            }
          }
          response.vdc = responseVdc;
        }
        return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `District Saved`, null);
      }
    }
    if (level === 'vdc') {
      let { _id, name, slug, order, is_active, is_deleted, areas, state_id, district_id } = req.body;
      if (!slug && name) {
        slug = otherHelper.slugify(name);
      }
      if (_id) {
        if (is_deleted) {
          const response = await vdcMunicipalitySch.findByIdAndUpdate(_id, { $set: { is_deleted, deleted_by: req.user.id, deleted_at: new Date() } }, { new: true });

          if (!is_deleted || (is_deleted && is_sub)) {
            const deleteSub = await Promise.all([areaSch.updateMany({ vdcmunicipality_id: _id }, { $set: { is_deleted: is_deleted } })]);
          }
          if (is_deleted) {
            const deleteParent = await Promise.all([stateSch.updateOne({ _id: vdc.state_id }, { $set: { is_deleted: is_deleted } }), disctrictSch.updateOne({ _id: vdc.district_id }, { $set: { is_deleted: is_deleted } })]);
          }

          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `VDC/Municipality Deleted`, null);
        } else {
          let response = await vdcMunicipalitySch.findByIdAndUpdate(_id, { $set: { name, slug, order, state_id: state_id, district_id: district_id, is_active } }, { new: true }).lean();
          if (response) {
            let responseArea = [];
            await areaSch.updateMany({ vdcmunicipality_id: _id }, { $set: { is_deleted: true } }, { new: true });
            for (let i = 0; i < areas.length; i++) {
              areas[i].vdcmunicipality_id = _id;
              areas[i].state_id = state_id;
              areas[i].district_id = district_id;
              areas[i].is_deleted = false;
              areas[i].slug = areas[i].slug ? areas[i].slug : otherHelper.slugify(slug + '-' + areas[i].name);
              if (areas[i]._id) {
                const d = await areaSch.findByIdAndUpdate(areas[i]._id, { $set: areas[i] }, { new: true });
                responseArea.push(d);
              } else {
                areas[i].added_by = req.user.id;
                const newDistrict = new areaSch(areas[i]);
                const d = await newDistrict.save();
                responseArea.push(d);
              }
            }
            response.vdc = responseArea;
          }
          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `VDC/Municipality Updated`, null);
        }
      } else {
        const name = req.body.name.trim();
        const checkIf = await vdcMunicipalitySch.findOne({ name: { $regex: name, $options: 'i' }, is_deleted: false });
        if (checkIf) {
          error = { name: 'Name Already exists' };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
        }
        const newState = new vdcMunicipalitySch({ name, slug, order, is_active, added_by: req.user.id, state_id: state_id, district_id: district_id });
        let data = await newState.save();
        let response = await vdcMunicipalitySch.findById(data._id).lean();
        if (response) {
          let responseArea = [];
          await areaSch.updateMany({ district_id: response._id }, { $set: { is_deleted: true } }, { new: true });
          for (let i = 0; i < areas.length; i++) {
            areas[i].state_id = state_id;
            areas[i].vdcmunicipality_id = response._id;
            areas[i].district_id = district_id;
            areas[i].is_deleted = false;
            areas[i].slug = areas[i].slug ? areas[i].slug : otherHelper.slugify(slug + '-' + areas[i].name);
            if (areas[i]._id) {
              const d = await areaSch.findByIdAndUpdate(areas[i]._id, { $set: areas[i] }, { new: true });
              responseArea.push(d);
            } else {
              areas[i].added_by = req.user.id;
              const newDistrict = new areaSch(areas[i]);
              const d = await newDistrict.save();
              responseArea.push(d);
            }
          }
          response.vdc = responseArea;
        }
        return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `VDC/Municipality Saved`, null);
      }
    }
    if (level === 'area') {
      let { _id, name, slug, order, is_active, is_deleted, state_id, district_id, vdcmunicipality_id } = req.body;
      if (!slug && name) {
        slug = otherHelper.slugify(name);
      }
      if (_id) {
        if (is_deleted) {
          const response = await areaSch.findByIdAndUpdate(_id, { $set: { is_deleted, deleted_by: req.user.id, deleted_at: new Date() } }, { new: true });

          if (is_deleted) {
            const deleteParent = await Promise.all([stateSch.updateOne({ _id: area.state_id }, { $set: { is_deleted: is_deleted } }), disctrictSch.updateOne({ _id: area.district_id }, { $set: { is_deleted: is_deleted } }), vdcMunicipalitySch.updateOne({ _id: area.vdcmunicipality_id }, { $set: { is_deleted: is_deleted } })]);
          }

          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `Area Deleted`, null);
        } else {
          let response = await areaSch.findByIdAndUpdate(_id, { $set: { name, slug, order, state_id: state_id, district_id: district_id, is_active, vdcmunicipality_id: vdcmunicipality_id } }, { new: true });
          return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `Area Updated`, null);
        }
      } else {
        const name = req.body.name.trim();
        const checkIf = await areaSch.findOne({ name: { $regex: name, $options: 'i' }, is_deleted: false });
        if (checkIf) {
          error = { name: 'Name Already exists' };
          return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
        }
        const newState = new areaSch({ name, slug, order, is_active, added_by: req.user.id, vdcmunicipality_id, state_id: state_id, district_id: district_id });
        let data = await newState.save();
        return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, `Area Saved`, null);
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, `Invalid Call`, `Invalid Call`, null);
    }
  } catch (err) {
    next(err);
  }
};

nepalLocationController.changeActiveStatus = async (req, res, next) => {
  try {
    const active = !!req.body.is_active;
    const is_sub = !!req.body.is_sub;
    const id = req.body._id;

    const level = req.params.level;

    if (level === 'state') {
      const state = await stateSch.findByIdAndUpdate(id, { $set: { is_active: active } }, { new: true });
      if (!active || (active && is_sub)) {
        const activeSub = await Promise.all([disctrictSch.updateMany({ state_id: id }, { $set: { is_active: active } }), vdcMunicipalitySch.updateMany({ state_id: id }, { $set: { is_active: active } }), areaSch.updateMany({ state_id: id }, { $set: { is_active: active } })]);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, state, null, `State`, null);
    }
    if (level === 'district') {
      const district = await disctrictSch.findByIdAndUpdate(id, { $set: { is_active: active } }, { new: true });
      if (!active || (active && is_sub)) {
        const activeSub = await Promise.all([vdcMunicipalitySch.updateMany({ district_id: id }, { $set: { is_active: active } }), areaSch.updateMany({ district_id: id }, { $set: { is_active: active } })]);
      }
      if (active) {
        const activeParent = await Promise.all([stateSch.updateOne({ _id: district.state_id }, { $set: { is_active: active } })]);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, district, null, `District`, null);
    }
    if (level === 'vdc') {
      const vdc = await vdcMunicipalitySch.findByIdAndUpdate(id, { $set: { is_active: active } }, { new: true });
      if (!active || (active && is_sub)) {
        const activeSub = await Promise.all([areaSch.updateMany({ vdcmunicipality_id: id }, { $set: { is_active: active } })]);
      }
      if (active) {
        const activeParent = await Promise.all([stateSch.updateOne({ _id: vdc.state_id }, { $set: { is_active: active } }), disctrictSch.updateOne({ _id: vdc.district_id }, { $set: { is_active: active } })]);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, vdc, null, `VDC`, null);
    }
    if (level === 'area') {
      const area = await areaSch.findByIdAndUpdate(id, { $set: { is_active: active } }, { new: true });
      if (active) {
        const activeParent = await Promise.all([stateSch.updateOne({ _id: area.state_id }, { $set: { is_active: active } }), disctrictSch.updateOne({ _id: area.district_id }, { $set: { is_active: active } }), vdcMunicipalitySch.updateOne({ _id: area.vdcmunicipality_id }, { $set: { is_active: active } })]);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, area, null, `Area`, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, `Invalid Call`, `Invalid Call`, null);
    }
  } catch (err) {
    next(err);
  }
};
nepalLocationController.getAllLocation = async (req, res, next) => {
  try {
    const active = req.query.active;
    let filter = { is_deleted: false };
    if (active != 'all') {
      filter = { ...filter, is_active: true };
    }
    const [allState, allDistrict, allVdc, allArea] = await Promise.all([
      stateSch.find(filter).select({ name: 1, slug: 1, is_active: 1 }).lean(),
      disctrictSch.find(filter).select({ name: 1, slug: 1, state_id: 1, is_active: 1 }).lean(),
      vdcMunicipalitySch.find(filter).select({ name: 1, slug: 1, district_id: 1, is_active: 1 }).lean(),
      areaSch.find(filter).select({ name: 1, slug: 1, vdcmunicipality_id: 1, is_active: 1 }).lean(),
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, { allState, allDistrict, allVdc, allArea }, null, `All Location`, null);
  } catch (err) {
    next(err);
  }
};

module.exports = nepalLocationController;

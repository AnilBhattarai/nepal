const mongoose = require('mongoose');
const schema = mongoose.Schema;
const counterSch = require('../../helper/counterSchema');
const config = require('./propertyConfig');
const otherHelper = require('../../helper/others.helper');
const pointSchema = new schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    required: false,
  },
});
const propertySchema = new schema({
  property_id: { type: Number },
  view_count_user: { type: Number, default: 0 },
  view_count_guest: { type: Number, default: 0 },
  slug_url: { type: String, required: false },
  project_id: { type: Number },
  prefix: { type: String, required: false, default: 'nh' },
  is_project: { type: Boolean, default: false, required: false },
  map_src: { type: String },
  posted_by_admin: { type: Boolean, default: false, required: false },
  basic: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    property_purpose: { type: schema.Types.ObjectId, ref: 'enum' }, // For Sale, Rent, Lease
    property_type: [{ type: schema.Types.ObjectId, ref: 'enum' }], // Residential, Plots, Commercial
    property_category: { type: schema.Types.ObjectId, ref: 'enum' }, // House, Land, Flat, Apartment, Business, Office Space , Hostel
    property_ownership: { type: schema.Types.ObjectId, ref: 'enum' }, // individual, institutional ?
  },
  address: {
    state_id: { type: schema.Types.ObjectId, ref: 'np_state' }, //enum
    district_id: { type: schema.Types.ObjectId, ref: 'np_disctrict' }, //enum
    city_id: { type: schema.Types.ObjectId, ref: 'np_vdcmunicipality' }, //enum
    area_id: { type: schema.Types.ObjectId, ref: 'np_area' }, // enum
    house_no: { type: String, required: false },
  },
  location: {
    zoom: { type: Number },
    type: pointSchema,
  },
  location_property: {
    total_area_unit: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
    total_area: { type: String, required: false },
    built_area: { type: String, required: false },
    built_area_unit: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
    property_face: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
    road_access_value: { type: String, required: false },
    road_access_length_unit: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
    road_access_road_type: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
  },
  building: {
    built_year: { type: Number },
    built_month: { type: Number },
    calender_type: {
      type: schema.Types.ObjectId,
      ref: 'enum',
    }, //AD,BS
    total_floor: { type: Number, required: false },
    furnishing: { type: schema.Types.ObjectId, ref: 'enum' }, // Full,Semi,Un
    no_of: {
      kitchen: { type: Number, required: false },
      dinningroom: { type: Number, required: false },
      bedroom: { type: Number, required: false },
      bathroom: { type: Number, required: false },
      hall: { type: Number, required: false },
    },
    parking: { type: String, required: false },
    amenities: [{ type: schema.Types.ObjectId, ref: 'enum' }], //enum
  },
  media: {
    images: [{ id: { type: schema.Types.ObjectId, ref: 'media' }, caption: { type: schema.Types.ObjectId, ref: 'enum' } }],
    youtube_video_id: { type: String, min: 9, max: 12 },
  },
  price: {
    is_price_on_call: { type: Boolean, default: false },
    is_starting_from: { type: Boolean, default: false },
    value: { type: Number, required: false },
    currency: { type: schema.Types.ObjectId, ref: 'enum' }, //enum
    label: { type: schema.Types.ObjectId, ref: 'enum' }, // Per Ana, Per SqFeet
  },
  range: {
    from: { type: Number },
    to: { type: Number },
    unit: { type: String },
  },
  unit_count: { type: Number },
  project_features: [{ feature: { type: schema.Types.ObjectId, ref: 'enum' }, value: { type: String } }],
  project_property_type: [
    {
      type: { type: String },
      area: { type: String },
      area_option: { type: schema.Types.ObjectId, ref: 'enum' },
      price: { type: String },
      total_unit: { type: String },
      available_unit: { type: String },
      bathroom: { type: String },
      bedroom: { type: String },
      kitchen: { type: String },
      puja_room: { type: String },
      living_room: { type: String },
      image: [{ type: schema.Types.ObjectId, ref: 'media' }],
      floor_no: { type: Number, required: false },
      floor_plan: [{ feature_list: [{ type: String }], floor_name: { type: String }, image: [{ type: schema.Types.Mixed }] }],
      unit_count: { type: Number },
      minimum_price: { type: Number },
      maximum_price: { type: Number },
      is_completed: { type: Boolean, default: false },
    },
  ],
  project_payment_plan: [{ image: { type: schema.Types.ObjectId, ref: 'media' }, title: { type: String } }],
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  owened_by: { type: schema.Types.ObjectId, ref: 'users' },
  agency_id: { type: schema.Types.ObjectId, ref: 'agency' },
  developer_id: { type: schema.Types.ObjectId, ref: 'developer' },
  is_by_agency: { type: Boolean, default: false, require: true },
  added_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: false },
  is_save: { type: Boolean, default: false },
  agent_id: { type: schema.Types.ObjectId, ref: 'users' },
  project_status: { type: schema.Types.ObjectId, ref: 'enum' },
  is_pending: { type: Boolean, default: false },
  is_rejected: { type: Boolean, default: false },
  is_favourite: { type: Boolean, default: false },
  favourite_count: { type: Number, default: 0 },
  is_agree: { type: Boolean, default: false },
  is_sold_out: { type: Boolean, default: false },
  sold_out_price: { type: Number, default: false },
  is_published: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  is_verified: { type: Boolean, default: false },
  verified_by: { type: schema.Types.ObjectId, ref: 'users' },
  verified_at: { type: Date },
  is_premium: { type: Boolean, default: false },
  is_exclusive: { type: Boolean, default: false },
  is_negotiable: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  tags: [{ type: String }],
  project_built_year: { type: String },
  project_built_month: { type: String },
  project_complete: { type: Boolean, default: false },
});
propertySchema.pre('save', function (next) {
  var doc = this;
  if (doc.is_project) {
    counterSch.findByIdAndUpdate({ _id: 'project_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counterSch) {
      if (error) return next(error);
      doc.project_id = (counterSch && counterSch.seq) || 1;
      doc.prefix = config.prefix.project;
      doc.slug_url = doc.slug_url + '-' + doc.prefix + doc.project_id;
      next();
    });
  } else {
    counterSch.findByIdAndUpdate({ _id: 'property_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counterSch) {
      if (error) return next(error);
      doc.property_id = (counterSch && counterSch.seq) || 1;
      doc.prefix = config.prefix.property;
      doc.slug_url = doc.slug_url.trim() + '-' + doc.prefix + doc.property_id;
      next();
    });
  }
});
module.exports = property = mongoose.model('property', propertySchema);

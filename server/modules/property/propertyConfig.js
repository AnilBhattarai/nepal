module.exports = {
  validation: {
    empty: 'This field is required',
    isDate: 'Please input date type data',
    invalidYoutubeKey: 'Invalid youtube Key',
    //message for mongoID
    mongoIderr: 'Invalid type',
    isNumber: 'Please input number type data',
    isBoolean: 'Please input boolean type data',
    isYearlength: 'like: ' + new Date().getFullYear(),
    isMonthlength: 'like: ' + new Date().getMonth(),
    messageLength: 'This field should be between 500 to 5000',
    isEmail: 'This field should be of email type',
    isPhone: 'This field must be phone no',
  },
  offerGet:`Property get successfully!!`,
  get: `Property get successfully!!`,
  save: 'Property save successfully',
  gets: 'Properties get successfully',
  updated: 'Properties updated successfully',
  prefix: {
    project: 'NHP',
    property: 'NH',
  },
};

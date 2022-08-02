module.exports = {
  validationMessage: {
    nameRequired: 'I think you missed the Name field!!',
    nameInvalidLength: 'Sorry, Name must be at least 5 characters',
    designationInvalid: 'Sorry, Designation must be a valid value!',
    emailInvalid: 'I think Email is Invalid!',
    emailRequired: 'Sorry, you missed the Email!!',
    passwordInvalidLength: 'Sorry, Password must be minimum 6 characters and maximum 30 characters!!!',
    passwordRequired: 'Sorry, Password is required!!!',
    password2Required: 'Please, reenter the Password',
    passwordMismatch: 'Sorry, your passwords do not match!!',
    stateInvalid: 'Sorry, State is invalid!!',
    districtInvalid: 'Sorry, District is invalid!!',
    vdcInvalid: 'Sorry, VDC/Municipality is invalid!!',
    emailExists: 'I am sure, that Email already exists!!!',
    rolesInvalid: 'Sorry, the Role you selected is invalid!!!',
    rolesRequired: 'Sorry, you missed the roles field!!',
    userOrCompanyRequired: 'Please select at least one between company and user for subscription',
  },
  validate: {
    empty: 'This field is required',
    isBoolean: 'This field must be Boolean',
    invalid: 'Invalid entry',
    isEmail: 'Please input the email type data',
    isMongoId: 'This is not mongo id',
    isEightChar: 'The password must be at least 8 character',
    invalidInput: 'invalid input',
    nameLength: 'This field should be between 2 to 100',
    isDate: 'This field must contain Date.',
    passLength: 'password must be at least 6 characters, max limit 30 characters',
    bioLength: 'length of bio should be between 5 to 500',
    skillLength: 'length of skill should be between 5 to 400',
    emailLength: 'length of email should be between 5 to 100',
    pwLength: 'length of password should be at least 6 characters',
    isEqual: 'Password does not match',
    isGender: 'Provide valid gender',
    noGender: 'Please select your gender',
    mobile: 'please select valid mobileno',
  },
  save: 'User data saved successfully!!',
  delete: 'User data deleted successfully!!',
  get: 'User data obtained successfully!!',
  gets: 'Users data obtained successfully!!',
  registerUser: 'User Register Successfully, Use verification code sent to your email to verify email.',
  registerAdmin: 'User Register Successfully.',
  emailVerify: 'Email Verified Successful',
  subscribeFail: 'Subscription failed',
};

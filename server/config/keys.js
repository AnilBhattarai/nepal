module.exports = {
  //mongoURI: 'mongodb://nepalhomes:nepalhomes1@ds263927.mlab.com:63927/nepalhomes',
  mongoURI: 'mongodb+srv://nepalhomes1:nepalhomes1@dev.ruscd.mongodb.net/nhdb?retryWrites=true&w=majority',
  recaptcha: { secretKey: '6LcSQ78UAAAAAGgk9xiiizLFot29zyeAtC2b3JQX', siteKey: '6LcSQ78UAAAAAFlkl1dCE5T5l8rN4kQnYYNAP0Jc' },
  secretOrKey: 'jwtsecret',
  tokenExpireTime: 3600000,
  isOauthConfig: { isGoogleAuth: true, isFacebookAuth: true, isGithubAuth: false },
  oauthConfig: {
    googleAuth: {
      client_id: '521974798939-t17tkpgbfnjtg9o3ca7eldahs3401g5c.apps.googleusercontent.com',
      client_secret: '3P2vFxwtLkF47LxgyT2rgiCS',
    },
    facebookAuth: {
      FACEBOOK_APP_ID: '403635297248992',
      FACEBOOK_APP_SECRET: 'e8d7b95e402af9054a4ce0a7a61f696d',
    },
    githubAuth: {
      ClientID: '',
      ClientSecret: '',
    },
  },
};

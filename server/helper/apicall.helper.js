(thirdPartyApiRequesterHelper => {
  'use strict';

  const request = require('request-promise');
  const rp = require('request-promise');

  thirdPartyApiRequesterHelper.requestThirdPartyApi = async (req, request_url, headers, next, request_method ,body ) => {
    try {
      const options = headers
        ? {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            json: true, // Automatically stringifies the body to JSON
            headers: headers,
            body:body
          }
        : {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            json: true, // Automatically stringifies the body to JSON
            body:body
          };
      const response = await request(options);
      return response;
    } catch (err) {
      return next(err);
    }
  };
  thirdPartyApiRequesterHelper.requestThirdPartyApi1 = (request_url, headers, body, request_method) => {
    try {
      const options = headers
        ? {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            body: body,
            json: true, // Automatically stringifies the body to JSON
            headers: headers,
          }
        : {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            body: body,
            json: true, // Automatically stringifies the body to JSON
          };
      return new Promise((resolve, reject) => {
        rp(options)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            resolve({ err });
          });
      });
    } catch (err) {
      return console.log(err);
    }
  };
})(module.exports);

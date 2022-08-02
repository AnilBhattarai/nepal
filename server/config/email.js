module.exports = {
  smtp: {
    protocal: '',
    email: 'no-reply@nepaloffers.com',
    password: '96/W]j2u@yn%_cf[',
    server: 'smtp.zoho.com',
    port: '465',
    secure: true,
    security: 'SSL',
  },
  channel: 'sendblue', // ['waft','smtp','mailgun','sendgrid'] // waft : no need to confuger any thing and email is sent from contact@nepalhomes.org
  mailgun: {
    api_key: '',
    domain: '',
  },
  sendgrid: {
    api_key: '',
  },
  sendblue: {
    api_key: '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',
    sender_name: 'Nepal Homes',
    sender_email: 'info@mbkapp.com',
  },
};

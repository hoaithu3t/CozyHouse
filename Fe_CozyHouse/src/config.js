const dev = {
  API_URL: 'http://localhost:5000',
  oAuthConfig: {
    issuer: 'http://localhost:5000',
    clientId: 'CozyHouse',
    clientSecret: '1q2w3e*',
    scope: 'CozyHouse',
  },
};

const prod = {
  API_URL: 'https://ipay-api.saokhuee.com',
  oAuthConfig: {
    issuer: 'https://ipay-api.saokhuee.com',
    clientId: 'CozyHouse',
    clientSecret: '1q2w3e*',
    scope: 'CozyHouse',
  },
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};

var proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/api/v1', '/auth/google', '/img'],
    proxy({ target: process.env.REACT_APP_HOST_ADDRESS })
  );
};

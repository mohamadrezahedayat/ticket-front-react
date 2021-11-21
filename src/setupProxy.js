const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware(['/api', '/img', '/auth/'], {
  // target: process.env.REACT_APP_HOST_ADDRESS,
  target: process.env.REACT_APP_HOST_ADDRESS,
});

module.exports = (app) => {
  app.use(proxy);
};
// module.exports = function (app) {
//   app.use(
//     '/auth',
//     createProxyMiddleware({
//       target: 'http://localhost:3300',
//     })
//   );
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:3300',
//     })
//   );
//   app.use(
//     '/img',
//     createProxyMiddleware({
//       target: 'http://localhost:3300',
//     })
//   );
// };

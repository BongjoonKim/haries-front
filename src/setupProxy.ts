export const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use(
    createProxyMiddleware("/*", {
      target: 'http://3.34.140.118:3001',
      changeOrigin: true,
    })
  );
};
export const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use(
    createProxyMiddleware("/*", {
      target: 'http://13.125.108.196:3001',
      changeOrigin: true,
    })
  );
};
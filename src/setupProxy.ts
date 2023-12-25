export const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use(
    createProxyMiddleware("/*", {
      target: 'http://13.209.27.28:3001',
      changeOrigin: true,
    })
  );
};
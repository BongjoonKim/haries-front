export const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use(
    createProxyMiddleware("/*", {
      target: 'http://3.35.214.21:3001',
      changeOrigin: true,
    })
  );
};
// setupProxy.js
export const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app : any) => {
  // auth 포함 하위 route에 대해서는 localhost:5000/v1을 domain으로 하여 proxy설정
  app.use(
    '/local',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    }))
  // dummy 포함 하위 route에 대해서는 localhost:6000/v1을 domain으로 하여 proxy설정
  app.use(
    '/remote',
    createProxyMiddleware({
      target: 'http://remote.test.com',
      changeOrigin: true,
    })
  )
}
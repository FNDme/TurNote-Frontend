const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require('./app/config/backend.config.js');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://${config.BACKEND_HOST}:8080`,
      changeOrigin: true,
    })
  );
};
const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    // app.use(
    //     '/game',
    //     createProxyMiddleware({
    //         target: 'http://localhost:9000',
    //         changeOrigin: true,
    //     })
    // )
    // app.use(createProxyMiddleware('/game', {target: "http://localhost:9000", changeOrigin: true}));
    // app.use(createProxyMiddleware('/', {target: "http://localhost:9000", changeOrigin: true}));
    // app.use(
    //     createProxyMiddleware("/game", {
    //         target: "http://localhost:9000/game",
    //         changeOrigin: true,
    //         // onProxyReq(proxyReq) {
    //         //     if (proxyReq.getHeader("origin")) {
    //         //         proxyReq.setHeader("origin", "https://example.org")
    //         //     }
    //         // },
    //         // pathRewrite: { "^/rootpath": "" },
    //         logLevel: "debug",
    //     })
    // );
    app.use(createProxyMiddleware("/game", {
        target: "http://localhost:9000/game", changeOrigin: true, logLevel: "debug",
    }));
    app.use(createProxyMiddleware("/api", {
        target: "http://localhost:9000/api", changeOrigin: true, logLevel: "debug",
    }));
    app.use(createProxyMiddleware("/images", {
        target: "http://localhost:9000/images", changeOrigin: true, logLevel: "debug",
    }));
};
const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config.json');
const PORT = config.PORT;
const app = express();

require('dotenv').config({ path: 'secret.env' })

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

//app.use("/API",createProxyMiddleware({target: "http://localhost:5004/API",}));
//app.use("/v1", createProxyMiddleware({target: "http://localhost:5004/v1",}));
//app.use("/v1Priv", createProxyMiddleware({target: "http://localhost:5004/v1Priv",}));

//const app = express();

/*
function basicProxy(route, targetPort) {
    const proxy = httpProxy.createProxyServer({});

    // Forward headers from the original request to the proxied request
    //const targetURL = `http://localhost:${targetPort}${route}`;
    //const proxyOptions = {
    //    target: targetURL,
    //    changeOrigin: true, // Necessary for target to accept the host header from the client
    //};
    //console.log("Proxying to " + proxyOptions.target + " from " + req.url)
  
    //// Proxy the request
    //proxy.web(req, res, proxyOptions, (err) => {
    //    if (err) {
    //        console.error(err);
    //        res.sendStatus(500); // Send an error status code if the proxy encounters an error
    //    }
    //});
    return (req, res, next) => {
        // Forward headers from the original request to the proxied request
        const dynamicRoute = req.originalUrl.substring(1); // Remove the leading '/'
        const targetURL = `http://localhost:${targetPort}/${dynamicRoute}`;

        console.log(dynamicRoute)
        const proxyOptions = {
          target: targetURL,
          changeOrigin: true,
        };
    
        console.log("Proxying to " + proxyOptions.target + " from " + req.url);
        
        // Proxy the request
    
        //proxy.proxyRequest(req, res, {
        //    host: 'localhost',
        //    port: 5004,
        //    buffer: buffer
        //});
    
        proxy.web(req, res, proxyOptions, (err) => {
          if (err) {
            console.error(err);
            return next(err); // Pass the error to Express error handling middleware
          }
        });
      };
}

app.use('/API/*', basicProxy('/API', 5004));

app.use('/v1/*', basicProxy('/v1', 5004));

app.use('/v1Priv/*', basicProxy('/v1Priv', 5004));

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

//*/

///*
function dynamicProxy(targetPort) {
  const proxy = httpProxy.createProxyServer({
    timeout: 5000, // Set timeout to 60 seconds (adjust as needed)

  });
  
  return (req, res, next) => {
    const dynamicRoute = req.originalUrl.substring(1);
    const targetURL = `http://localhost:${targetPort}/${dynamicRoute}`;
    var buffer = httpProxy.buffer(req);

    const proxyOptions = {
      target: targetURL,
      changeOrigin: true,
      
    };

    console.log(`Proxying to ${proxyOptions.target} from ${req.url}`);
    
    // Additional logging for request details
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body); // If you're sending data in the body
    
    proxy.proxyRequest(req, res, {
        host: 'localhost',
        port: 5004,
        buffer: buffer
    });

    // Proxy the request
    //proxy.web(req, res, proxyOptions, (err) => {
    //  if (err) {
    //    console.error(err);
    //    return next(err);
    //  }
    //});
    //proxy.on('proxyRes', (proxyRes) => {
    //    console.log('Target Server Response Headers:', proxyRes.headers);
    //  });
  };
}


// Use the dynamicProxy middleware for all routes
app.use('*', dynamicProxy(5004));/*

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

*/
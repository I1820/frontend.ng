/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 05-11-2018
 * |
 * | File Name:     server.js
 * +===============================================
 */
const Hapi = require("hapi");

const server = Hapi.server({
  port: 1820,
  host: "0.0.0.0"
});

const init = async () => {
  await server.register(require("inert"));
  await server.register(require("h2o2"));

  server.route({
    method: ["GET", "POST", "PUT", "DELETE"],
    path: "/api/{param*}",
    handler: {
      proxy: {
        ttl: "upstream", // applies the upstream response caching policy to the response

        // maps the request URI to the proxied URI with custom headers.
        mapUri: (req) => {
          return {
            uri: `http://127.0.0.1:1994/api/${req.params.param}`,
            headers: { // everything in APIs is based on JSON so forcibly change headers.
              "Content-Type": "application/json",
              "Accept": "application/json",
            }
          }
        },

        // processes the response of upstream service before sending to the client.
        onResponse: (err, res, request, h, settings, ttl) => {
          if (res.statusCode === 404) {
            // TODO: handles 404 with our theme page
          }
          return res
        }
      }
    }
  });
  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "dist/i1820",
        index: ["index.html"]
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

init();

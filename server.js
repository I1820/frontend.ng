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
const Hapi = require('hapi');

const server = Hapi.server({
  port: 1820,
  host: '0.0.0.0'
})

const init = async () => {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist/i1820',
        index: ['index.html']
      }
    }
  });

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

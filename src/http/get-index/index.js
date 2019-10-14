// Add simple, fast, scalable persistence: https://docs.begin.com/en/data/begin-data/
// let data = require('@begin/data')

// Add secure sessions, middleware, and more: https://docs.begin.com/en/functions/http/
// let arc = require('@architect/functions')


const { Pool } = require('pg')

let pgPool

function createPool() {
  console.log("Initialise pool")
  pgPool = new Pool()
}

exports.handler = async function http(req, context) {

  if( !pgPool )
  {
    createPool()
  }
  else
  {
    console.log("Reuse existing pool")
  }

  console.log("pgPool connect")

  // Fetch a postgres client from the pool
  const pgClient = await pgPool.connect()

  console.log('pgClient connected')

  // Pretend to do a little work
  await new Promise(done => setTimeout(done, 2000))

  pgClient.release()

  console.log('pgClient released')

  return {
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify(context)
  }
}

// Example responses

/* Forward requester to a new path
exports.handler = async function http (req) {
  return {
    statusCode: 302,
    headers: {'location': '/about'}
  }
}
*/

/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/

/* Deliver client-side JS
exports.handler = async function http (req) {
  return {
    headers: {'content-type': 'text/javascript; charset=utf8'},
    body: 'console.log("Hello world!")',
  }
}
*/

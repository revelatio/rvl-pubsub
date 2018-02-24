const axios = require('axios')

const DEFAULT_CHANNELS = ['development', 'staging', 'production']

/***
 * Publish a message on the Projects PubSub queue
 * @param {String} reponame - Current repo name
 * @param {String} type - message type (payload prop)
 * @param {String} payload - actual payload
 * @returns {Promise}
 */
module.exports.publish = (reponame, type, payload) => {
  const channel = process.env.ENV_CHANNEL || 'development'
  const url = (DEFAULT_CHANNELS.some(def => def === channel))
    ? `http://www.revelat.io/api/rvl-dev/pubsub/${reponame}/${channel}`
    : `http://${channel}.revlt-dev.io/api/rvl-dev/pubsub`

  return axios({
    url: url,
    method: 'POST',
    headers: { token: process.env.REVELATIO_AUTH_TOKEN },
    data: {type, payload}
  })
    .then(response => response.data)
    .catch(err => {
      throw new Error(err.response.data)
    })
}

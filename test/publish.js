const test = require('ava')
const { publish } = require('../index')
const nock = require('nock')

test.serial('publish payload on development channel', t => {
  process.env.ENV_CHANNEL = 'development'
  process.env.REVELATIO_AUTH_TOKEN = 'some-token'

  const scope = nock('http://www.revelat.io')
    .post('/api/rvl-dev/pubsub/my-app-back/development')
    .matchHeader('token', 'some-token')
    .reply(200, {
      status: 'ok',
      result: '946B7D1C'
    })

  return publish('my-app-back', 'do-task', {name: 'John'})
    .then(() => {
      t.true(scope.isDone())
    })
})

test.serial('publish payload on staging channel', t => {
  process.env.ENV_CHANNEL = 'staging'
  process.env.REVELATIO_AUTH_TOKEN = 'some-token'

  const scope = nock('http://www.revelat.io')
    .post('/api/rvl-dev/pubsub/my-app-back/staging')
    .matchHeader('token', 'some-token')
    .reply(200, {
      status: 'ok',
      result: '946B7D1C'
    })

  return publish('my-app-back', 'do-task', {name: 'John'})
    .then(() => {
      t.true(scope.isDone())
    })
})

test.serial('publish payload on production channel', t => {
  process.env.ENV_CHANNEL = 'production'
  process.env.REVELATIO_AUTH_TOKEN = 'some-token'

  const scope = nock('http://www.revelat.io')
    .post('/api/rvl-dev/pubsub/my-app-back/production')
    .matchHeader('token', 'some-token')
    .reply(200, {
      status: 'ok',
      result: '946B7D1C'
    })

  return publish('my-app-back', 'do-task', {name: 'John'})
    .then(() => {
      t.true(scope.isDone())
    })
})

test.serial('publish payload on non-default channel', t => {
  process.env.ENV_CHANNEL = 'development-story-22'
  process.env.REVELATIO_AUTH_TOKEN = 'some-token'

  const scope = nock('http://development-story-22.revlt-dev.io')
    .post('/api/rvl-dev/pubsub')
    .matchHeader('token', 'some-token')
    .reply(200, {
      status: 'ok',
      result: '946B7D1C'
    })

  return publish('my-app-back', 'do-task', {name: 'John'})
    .then(() => {
      t.true(scope.isDone())
    })
})

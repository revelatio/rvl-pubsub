# rvl-pubsub

Revelat.io API for publishing pubsub events

This lib exposes a single function that allows you to send
pubsub messages to the right project/channel.

## Usage

Import the module and call the function. Is that simple, of course
you need to have the right env vars set

```javascript
const { publish } = require('rvl-pubsub')

publish('my-app-back', 'create-doc', {name: 'Hello World'})
    .then(result => {
        console.log(result)     // Usually in the form {status: 'ok'}
    })
    .catch(err => {
        console.log(err)
    })
```

Pubsub consumers can parse the message payload from JSON and obtain
both the type and original data as:

```json
{
    "type": "create-doc",
    "payload": {
        "name": "Hello World"
    }
}
```

The concept of **topic** is equivalent to `type` so no need to worry about
topics (for the moment)

You will need this two env vars:
- `ENV_CHANNEL` then environment you want to send messages
- `REVELATIO_AUTH_TOKEN` the revelatio authentication token

Usually you can have this two in a `.env` file that can be
generated using the [rvl-dev](https://github.com/revelatio/rvl-dev) CLI tool.

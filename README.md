# buffer-node
[![Build Status](https://img.shields.io/travis/matthistuff/buffer-node/master.svg?style=flat)](https://travis-ci.org/matthistuff/buffer-node) [![Code Climate](http://img.shields.io/codeclimate/github/matthistuff/buffer-node.svg?style=flat)](https://codeclimate.com/github/matthistuff/buffer-node)

buffer-node is a Node.js API Client for [Buffer](https://bufferapp.com/app)

## Installation
    $ npm install buffer-node

## Usage
Buffer-node offers an easy to use wrapper for the [Buffer API](https://bufferapp.com/developers/api).

**Example:**
```js
var bufferAPI = require('buffer-node'),
  api = bufferAPI('{{user access token}}')

api.user.get().then(
  function(response) {
    // handle success
    console.log(response)
  },
  function(err) {
    // handle error
    console.log(err)
  }
)
```

### Authentication
Buffer uses OAuth 2.0 for authorization. It is recommended to use a library such as [Passport](http://passportjs.org) to authorize and retrieve an access token for the user.

### Client creation
When requiring the buffer-node module, a factory function for the API client will be exposed. Simply pass an access token and the ready to use client will be returned.

```js
var bufferAPI = require('buffer-node'),
  api = bufferAPI('{{user access token}}')
```
  
### Requests
API requests always return a promise using the [promise](https://www.npmjs.org/package/promise) module. You should then use one of the supplied methods to handle successful calls and errors.

## API functions
The API client completely covers the available Buffer API endpoints. Some methods can take optional parameters as an object. The keys and values correspond to the parameter specified in the [API documentation](https://bufferapp.com/developers/api).

When passing dates, the API client will automatically convert JavaScript Date instances to the right format.

### User
Retrieve a single Buffer user account.

```js
api.user.get()
```

### Profiles
Retrieve the social media profiles associated with the current user account.

```js
api.profiles.get()
```

Retrieve a single social media profile.

```js
api.profile('<profile ID>').get()
```

### Schedules
Retrieve schedules associated with a social media profile.

```js
api.profile('<profile ID>').schedules.get()
```

Update schedules.

* **schedules** array of schedules ```[{days: ['mon', 'fri'], times: ['08:00', '15:00']}]```

```js
api.profile('<profile ID>').schedules.update(schedules)
```

### Updates
Retrieve pending updates for a social media profile.

* **options** page, count, since, utc

```js
api.profile('<profile ID>').updates.pending(options)
```

Retrieve sent updates for a social media profile.

* **options** page, count, since, utc

```js
api.profile('<profile ID>').updates.sent(options)
```

Retrieve a single update.

```js
api.update('<update ID>').get()
```

Retrieve social media interaction for a single update.

* **event** type of event
* **options** count, page

```js
api.update('<update ID>').interactions(event, options)
```

Reorder updates for a single social media profile.

* **order** Array of update IDs
* **options** offset, utc

```js
api.profile('<profile ID>').updates.reorder(order, options)
```

Shuffle updates for a single social media profile.

* **options** count, utc

```js
api.profile('<profile ID>').updates.shuffle(options)
```

Create a new update.

* **text** Update text
* **profileIds** Array of profile IDs
* **options** shorten, now, top, media, attachment, scheduled_at

```js
api.updates.create(text, profileIds, options)
```

Modify an existing update.

* **text** Update text
* **options** now, media, utc, scheduled_at

```js
api.update('<update ID>').update(text, options)
```

Immediately share an existing update.

```js
api.update('<update ID>').share()
```

Delete an existing update.

```js
api.update('<update ID>').destroy()
```

Move an existing update to the top of the Buffer queue.

```js
api.update('<update ID>').moveToTop()
```

### Links
Get number of shares for a link on Buffer.

* **url** URL of the link

```
api.links.shares(url)
```

### Info
Get configuration Buffer is using for its social media profiles.

```js
api.info.configuration()
```
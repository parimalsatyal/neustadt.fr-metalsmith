# metalsmith-define [![Build Status](https://travis-ci.org/aymericbeaumet/metalsmith-define.svg?branch=master)](https://travis-ci.org/aymericbeaumet/metalsmith-define) [![NPM version](https://badge.fury.io/js/metalsmith-define.svg)](http://badge.fury.io/js/metalsmith-define)

A Metalsmith plugin to define values in the metadata.

Why you would use it is up to you, but here some ideas:
- expose a node module (e.g.: Underscore.js) in the metadata to use it in a
  template
- set variable related to the build script (e.g.: development/production
  environment)
- expose JSON files (e.g.: expose the `package.json` file similarly to how
  it's done in a classic Gruntfile)
- expose your own JavaScript modules (e.g.: define custom helper functions)

## Installation

```javascript
$ npm install metalsmith-define
```

## Usage

### CLI

```javascript
{
  "plugins": {
    "metalsmith-define": {
      "production": true
    }
  }
}
```

### JavaScript

```javascript
var MetalSmith = require('metalsmith');
var define = require('metalsmith-define');

Metalsmith(__dirname)
  .use(define({
    '_': require('underscore'),
    development: true,
    pkg: require('./package.json'),
    helpers: require('./helpers.js')
  }));
```

The option object passed to `metalsmith-define` contains couples of key/value.
Each value will be exposed in the metadata at the corresponding key.

## Changelog

* 1.0.0
  * Bump stable

* 0.0.2
  * Switch to Mocha/Chai to test

* 0.0.1
  * Define key/values in the metadata

## License

MIT © [Aymeric Beaumet](http://beaumet.me)

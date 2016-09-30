[![NPM version](https://img.shields.io/npm/v/metalsmith-redirect.svg?style=flat&label=npm)](https://www.npmjs.com/package/metalsmith-redirect)
[![Linux build status](https://img.shields.io/travis/aymericbeaumet/metalsmith-redirect/master.svg?style=flat&label=linux)](https://travis-ci.org/aymericbeaumet/metalsmith-redirect)
[![Windows build status](https://img.shields.io/appveyor/ci/aymericbeaumet/metalsmith-redirect/master.svg?style=flat&label=windows)](https://ci.appveyor.com/project/aymericbeaumet/metalsmith-redirect)
[![Code coverage](https://img.shields.io/codeclimate/coverage/github/aymericbeaumet/metalsmith-redirect.svg?style=flat&label=coverage)](https://codeclimate.com/github/aymericbeaumet/metalsmith-redirect)
[![GPA](https://img.shields.io/codeclimate/github/aymericbeaumet/metalsmith-redirect.svg?style=flat&label=GPA)](https://codeclimate.com/github/aymericbeaumet/metalsmith-redirect)
[![Dependencies status](https://img.shields.io/david/aymericbeaumet/metalsmith-redirect.svg?style=flat&label=dependencies)](https://david-dm.org/aymericbeaumet/metalsmith-redirect)

# metalsmith-redirect

A Metalsmith plugin to create HTTP redirections.

## Installation

```javascript
$ npm install metalsmith-redirect
```

## Usage

### CLI

```javascript
{
  "plugins": {
    "metalsmith-redirect": {
      "/from/foo.html": "/to/bar.html"
    }
  }
}
```

### JavaScript

```javascript
var MetalSmith = require('metalsmith');
var redirect = require('metalsmith-redirect');

Metalsmith(__dirname)
  .use(redirect({
    '/foo': '/img/foo.png',
    '/bar.html': '/img/'
  }))
```

This plugin can be configured by passing an object. Each key/value will be used
to create a redirection. Each key corresponds to the source and the associated
value to the destination.

Due to restrictions in the way this plugin proceeds, the source must be either:
- a HTML file path
- a folder path, in such a case '/index.html' will be appended

The destination can be any kind of path.

A relative path in the source will be resolved from '/'.

A relative path in the destination will be resolved from the source directory.

## Examples

Some examples of user configurations and how they are resolved by this plugin.
For each example, the first object is the user configuration, and the second
object is what is resolved by the plugin.


```javascript
{ 'foo': 'hidden.html' }
{ '/foo/index.html': '/foo/hidden.html' }
```

```javascript
{ '/foo/bar.html': 'baz' }
{ '/foo/bar.html': '/foo/baz' }
```

```javascript
// It is possible to do external redirections.
{ '/github': 'https://github.com/segmentio' }
{ '/github/index.html': 'https://github.com/segmentio' }
```

```javascript
// A Markdown file is not a valid source
{ 'foo.md': 'hidden.html' } // throw error
```

## Changelog

* 2.1.0
  * `contents` key is now a `Buffer`
    (https://github.com/aymericbeaumet/metalsmith-redirect/issues/10)
  * bump dev dependencies

* 2.0.1
  * Switch test suite to nyc + ava

* 2.0.0
  * Only support Node.js 4+
  * Drop the jade dependency in favor of the ES.next template strings

* 1.3.1
  * Lightweight npm-shrinkwrap

* 1.3.0
  * Bump dependencies

* 1.2.0
  * HTML meta redirection occurs immediately

* 1.1.0
  * `jade@1.11.0`
  * `metalsmith@1.7.0`
  * `metalsmith-templates@0.7.0`
  * `underscore@1.8.3`

* 1.0.2
  * The Jade template now produces valid HTML (the doctype was missing)

* 1.0.1
  * Strip leading slash to support latest Metalsmith major release (`1.0.0`)

* 1.0.0
  * Bump stable

* 0.0.3
  * Now use `rel=canonical` in the redirection template

* 0.0.2
  * Automatic NPM deployment from Travis
  * Fix the normalize.relativeTo() method

* 0.0.1
  * Internal redirections (both absolute and relative)
  * External redirections (toward other websites)

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Aymeric Beaumet](https://aymericbeaumet.com)
has waived all copyright and related or neighboring rights to this work.

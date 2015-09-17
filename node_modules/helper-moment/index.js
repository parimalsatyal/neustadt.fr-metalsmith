/*!
 * helper-moment <https://github.com/jonschlinkert/helper-moment>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependences
 */

var typeOf = require('kind-of');
var moment = require('moment');
var extend = require('extend-shallow');

/**
 * Expose moment `helper`
 */

module.exports = function momentHelper(str, pattern) {
  // if no args are passed, return a formatted date
  if (str == null && pattern == null) {
    moment.locale('en');
    return moment().format('MMMM DD, YYYY');
  }

  var opts = extend({lang: 'en'}, str, pattern);
  extend(opts, opts.hash);

  // set the language to use
  moment.locale(opts.lang);
  if (opts.hash) {
    if (opts.context) {
      extend(opts.hash, opts.context);
    }

    var date = moment(str);
    for (var key in opts.hash) {
      if (date[key]) {
        return date[key](opts.hash[key]);
      } else {
        console.log('moment.js does not support "' + key + '"');
      }
    }
  }


  if (typeOf(str) === 'object') {
    return moment(str).format(pattern);
  }

  // if only a string is passed, assume it's a date pattern ('YYYY')
  if (typeof str === 'string' && !pattern) {
    return moment().format(str);
  }

  return moment(str).format(pattern);
};

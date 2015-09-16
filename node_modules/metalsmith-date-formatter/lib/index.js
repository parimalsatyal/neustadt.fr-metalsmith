/**
 * User: daletan
 * Date: 5/27/15
 * Time: 12:10 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var moment = require('moment');
var transform = require('lodash.transform');
var isArray = require('lodash.isarray');
var isEmpty = require('lodash.isempty');
var isString = require('lodash.isstring');

var DEFAULT_FORMAT = 'MMMM DD, YYYY';
var DEFAULT_DATE_KEYS = ['publishDate', 'modifiedDate', 'date'];

module.exports = plugin;

/**
 * Format dates based on keys. This plugin only uses the UTC value
 * @param options
 * @param {array.<{key: string, format: string}>|array.<string>|string} options.dates Array of objects, array of strings, or a string
 * @param {string} [options.dates[].key] If taken in this format, the `key` is a target meta property name
 * @param {string} [options.dates[].format] If taken in this format, the `format` property is any date format `moment` accepts.
 *                                   If no `format` is given, it will default to `MMMM DD, YYYY`
 * @param {string} [options.dates[].<string>] If done in this format, an array of strings that target meta properties
 * @param {string} options.format Any date format that `moment` accepts, defaults to `MMMM DD, YYYY`
 * @returns {Function}
 * @example
 *
 * .use(dateFormatter({
 *   dates: [
 *      {
 *          key: 'publishDate',
 *          format: 'MM/DD/YYYY'
 *      },
 *      {
 *          key: 'modifiedDate',
 *          format: 'MMMM DD, YYYY'
 *      },
 *      {
 *          key: 'date'
 *      }
 *   ]
 * })
 *
 * // or
 *
 * .use(dateFormatter({
 *   dates: ['publishDate', 'modifiedDate', 'date']
 *   format: 'MMMM DD, YYYY'
 * })
 *
 */
function plugin(options) {
    options = options || {};
    var format = options.format || DEFAULT_FORMAT;
    // gets overwritten if `options.dates` is passed in
    var dateKeys = DEFAULT_DATE_KEYS;
    var normalizedDateKeys;
    var formats;

    if (isString(options.dates)) {
        dateKeys = [options.dates];
    } else if (isArray(options.dates)) {
        normalizedDateKeys = normalizeDateKeys(options.dates);
        if (normalizedDateKeys.keys) {
            // only override `dateKeys` if `keys` is returned
            dateKeys = normalizedDateKeys.keys;
        }
        if (normalizedDateKeys.formats) {
            formats = normalizedDateKeys.formats;
        }
    }

    return function (files, metalsmith, done) {

        Object.keys(files).forEach(function (key) {
            var file = files[key];

            // only works if dateKeys is an array
            // need to figure out how to normalize
            transform(dateKeys, function (result, fKey, index) {
                var time = result[fKey];
                var localFormat = format;
                if (formats && formats[index]) {
                    localFormat = formats[index];
                }
                if (time) {
                    result[fKey] = moment.utc(time).format(localFormat);
                }
            }, file);

        });

        done();
    }

}

/**
 *
 * @param {array.<{ key: string, format: string }>} dates
 * @returns {{keys: Array|null, formats: Array|null}}
 */
function normalizeDateKeys(dates) {
    var keys = [];
    var formats = [];

    dates.forEach(function (element) {
        if (isString(element)) {
            keys.push(element);
        } else {
            if (element.key) {
                keys.push(element.key);
            }
            if (element.format) {
                formats.push(element.format);
            }
        }
    });

    return {
        keys: !isEmpty(keys) ? keys : null,
        formats: !isEmpty(formats) ? formats : null
    };
}

/**
 * User: daletan
 * Date: 5/27/15
 * Time: 12:12 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';

var assert = require('assert');
var Metalsmith = require('metalsmith');
var dateFormatter = require('..');

describe('metalsmith date formatter', function () {
    var M;
    var format = 'MMMM DD YY';
    beforeEach(function () {
        M = Metalsmith('test/fixtures');
    });
    describe('array of strings', function () {
        var settings;
        beforeEach(function () {
            settings = {
               dates: ['publishDate', 'modifiedDate', 'date']
            };
        });
        it('should format the dates with default settings', function (done) {
            M.use(dateFormatter(settings))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('May 28, 2015', files['test1.md'].publishDate);
                    assert.equal('May 31, 2015', files['test1.md'].modifiedDate);
                    assert.equal('May 29, 2015', files['test1.md'].date);
                    done();
                });
        });
        it('should format the dates with custom format string', function (done) {
            settings.format = format;
            M.use(dateFormatter(settings))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('May 28 15', files['test1.md'].publishDate);
                    assert.equal('May 31 15', files['test1.md'].modifiedDate);
                    assert.equal('May 29 15', files['test1.md'].date);
                    done();
                });
        });
        it('should only format the `date` property', function (done) {
            M.use(dateFormatter(settings))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('undefined', typeof files['test2.md'].publishDate);
                    assert.equal('undefined', typeof files['test2.md'].modifiedDate);
                    assert.equal('May 31, 2015', files['test2.md'].date);
                    done();
                })
        });
    });
    describe('custom property', function () {
        it('should format passed in as a string', function (done) {
            M.use(dateFormatter({
                    dates: 'customDate'
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('May 31, 2015', files['test3.md'].customDate);
                    done();
                })
        });
        it('should format passed in as an array', function (done) {
            M.use(dateFormatter({
                    dates: ['customDate']
                }))
                .build(function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    assert.equal('May 31, 2015', files['test3.md'].customDate);
                    done();
                })
        });
    });
    it('should format the dates based on object settings', function (done) {
        M.use(dateFormatter({
                dates: [
                    {
                        key: 'publishDate',
                        format: format
                    },
                    {
                        key: 'modifiedDate',
                        format: format
                    },
                    {
                        key: 'date'
                    }
                ]
            }))
            .build(function (err, files) {
                if (err) {
                    return done(err);
                }
                assert.equal('May 28 15', files['test1.md'].publishDate);
                assert.equal('May 31 15', files['test1.md'].modifiedDate);
                assert.equal('May 29, 2015', files['test1.md'].date);
                done();
            });
    });
});

/*!
 * helper-moment <https://github.com/jonschlinkert/helper-moment>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var momentjs = require('moment');
var date = require('date.js');
var _ = require('lodash');

// helper
var moment = require('./');

describe('date', function () {
  it('should return a default formatted moment date when nothing is passed:', function () {
    moment().should.eql(momentjs().format("MMMM DD, YYYY"));
  });

  it('should format a date with moment:', function () {
    moment('YYYY').should.eql((+moment('YYYY')).toString());
  });

  it('should parse a human-readable date with date.js and return a formatted moment date:', function () {
    moment(date('This year.'), 'YYYY').should.eql(moment('YYYY'));
    moment(date('Next year.'), 'YYYY').should.eql((+moment('YYYY') + 1).toString());
    moment(date('10 years ago'), 'YYYY').should.eql((new Date().getFullYear() - 10).toString());
    moment(date('1 year from now'), 'YYYY').should.eql((+moment('YYYY') + 1).toString());
    moment(date('1 year ago'), 'YYYY').should.eql((+moment('YYYY') - 1).toString());
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= moment("MMMM DD, YYYY") %>', {}, {imports: {moment: moment}}).should.eql(moment("MMMM DD, YYYY"));
    _.template('<%= moment(new Date(), "MMMM DD, YYYY") %>', {}, {imports: {moment: moment}}).should.eql(moment("MMMM DD, YYYY"));
    _.template('<%= moment("YYYY") %>', {}, {imports: {moment: moment}}).should.eql(new Date().getFullYear().toString());
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('moment', moment);
    handlebars.compile('{{moment date "MM"}}')({date: new Date()}).should.eql(moment("MM"));
    handlebars.compile('{{moment date "MMMM DD, YYYY"}}')({date: new Date()}).should.eql(moment("MMMM DD, YYYY"));
    handlebars.compile('{{moment date formatDate}}')({formatDate: "MMMM DD, YYYY", date: new Date()}).should.eql(moment("MMMM DD, YYYY"));
  });
});
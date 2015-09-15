var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var beautify    = require('metalsmith-beautify');
var collections = require('metalsmith-collections');
var define      = require('metalsmith-define');

metalsmith(__dirname)
  .source('src')
  .use(define({
    blog: {
      uri: 'http://neustadt.fr',
      title: 'Neustadt.fr',
      description: 'Neustadt.fr is Parimal Satyal\'s collection of essays, reviews and music.',
      author: 'Parimal Satyal'
    },
    moment: require('moment')
  }))
  .use(collections({
    essays: {
      pattern: 'essays/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .destination('public')
  .use(permalinks())
  .use(layouts({
    engine: 'jade',
    directory: 'templates'
  }))
  .use(beautify({
    "preserve_newlines": true,
  }))
  .build(function (err) {
      if (err) {
        throw err;
      }
  });
